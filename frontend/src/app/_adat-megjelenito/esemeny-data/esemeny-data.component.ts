import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAzonositasService } from '../../_szervizek/user-azonositas.service';
import { UserService } from '../../_szervizek/user.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EsemenyService } from '../../_szervizek/esemeny.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'esemeny-data',
  templateUrl: './esemeny-data.component.html',
  styleUrls: ['./esemeny-data.component.css']
})
export class EsemenyDataComponent {
  displayedColumns: string[] = ['id','idopont','jegy_alapar','eloado','helyszin','modositas','torles']
  dataSource = new MatTableDataSource()
  eloadok:Map<number,string> = new Map<number,string>();
  helyszinek:Map<number,string> = new Map<number,string>();
  userService: any;

  constructor(private dialog:MatDialog,
              public esemenySzerviz:EsemenyService) {
    this.adatBetoltes()
  }
  
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: Event){
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter =filter.trim().toLowerCase();
  }

  adatBetoltes(){
    this.esemenySzerviz.helyszinEloadoNevId().subscribe({
      next:(valasz)=>{
        
        valasz.eloadok.forEach((eloado:any)=>{
          
          this.eloadok.set(eloado.id,eloado.nev);
        })
  
        valasz.helyszinek.forEach((helyszin:any)=>{
          this.helyszinek.set(helyszin.id,helyszin.nev);
        })
        this.esemenyBetoltes()
      },
      error:(error:any)=>{
        throw error
      }
    })
  }

  esemenyBetoltes() {
    this.esemenySzerviz.esemenyOsszes().subscribe((valasz) => {
      this.dataSource.data = valasz.map((valasz: any) => {

        return {
          id: valasz.id,
          idopont: valasz.idopont,
          jegy_alapar: valasz.jegy_alapar,
          helyszin: this.helyszinek.get(valasz.helyszin_id),
          helyszin_id: valasz.helyszin_id,
          eloado: this.eloadok.get(valasz.eloado_id),
          eloado_id: valasz.eloado_id,
        };
      });
    });
  }

  letrehozasAblak(enterAnimationDuration:string,exitAnimationDuration:string): void {
    const dialogref = this.dialog.open(EsemenyLetrehozas,{
      data: {
        eloadok :this.eloadok,
        helyszinek :this.helyszinek,
      },
      width:'500px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.esemenyBetoltes()
      })
  }

  modositasAblak(enterAnimationDuration:string,exitAnimationDuration:string,esemeny:any): void {
    const dialogref = this.dialog.open(EsemenyModositas,{
      data: { 
        esemeny :esemeny,
        eloadok :this.eloadok,
        helyszinek :this.helyszinek,
      },
      width:'500px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.esemenyBetoltes()
      })
  }

  torlesAblak(enterAnimationDuration:string,exitAnimationDuration:string,esemenyId:number): void {
    const dialogref = this.dialog.open(EsemenyTorles,{
      data: esemenyId,
      width:'250px',
      enterAnimationDuration,
      exitAnimationDuration});
    dialogref.afterClosed().subscribe(()=>{
      this.esemenyBetoltes()
    })
  }
}

@Component({
  template: `<div class="d-block justify-content-center text-center p-3">
                <div class="justify-content-center align-items-center mb-2">
                  <h1 mat-dialog-title >Esemény létrehozása</h1>
                  <h3>Esemény időpont</h3>
                  <div class="d-flex align-items-center">
                    <mat-form-field class="mr-2" appearance="fill">
                      <mat-label>Dátum:</mat-label>
                      <input matInput [matDatepicker]="picker" class="felhasznalo-input datum" [(ngModel)]="datum" (dateChange)="setOraPerc()">
                      <mat-hint></mat-hint>
                      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                      <mat-datepicker #picker></mat-datepicker>
                    </mat-form-field>
                    <mat-form-field class="w-25">
                      <mat-label>Óra:</mat-label>
                      <input matInput  [(ngModel)]="idopont_ora" type='number' class="w-100 mr-4" min=0 max=23 (change)="setOraPerc()">
                    </mat-form-field>
                    <mat-form-field class="w-25 ml-3">
                      <mat-label>Perc:</mat-label>
                      <input matInput [(ngModel)]="idopont_perc" type='number' class="w-100" min=0 max=59 (change)="setOraPerc()">
                    </mat-form-field>
                  </div>
                  <h3>Előadó/helyszín</h3>
                  <mat-form-field>
                    <mat-label>Előadó</mat-label>
                    <mat-select [(ngModel)]="eloado_id">
                      <mat-option *ngFor="let eloado of data.eloadok | keyvalue;" [value]="eloado.key">{{eloado.value}}</mat-option>
                    </mat-select> 
                  </mat-form-field>
                  <mat-form-field class="ml-3">
                    <mat-label>Helyszín</mat-label>
                    <mat-select [(ngModel)]="helyszin_id">
                      <mat-option *ngFor="let helyszin of data.helyszinek | keyvalue;" [value]="helyszin.key">{{helyszin.value}}</mat-option>
                    </mat-select> 
                  </mat-form-field>
                  <div mat-dialog-actions>
                  <button class='justify-self-start border' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end border' mat-raised-button color='primary' (click)="esemenyLetrehozas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule, MatDatepickerModule],
})
export class EsemenyLetrehozas {
  datum = new Date()
  eloado_id = ""
  helyszin_id = ""
  idopont_ora = 0
  idopont_perc = 0

  constructor(public dialogRef: MatDialogRef<EsemenyModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public esemenyService:EsemenyService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any)
              {}

  esemenyLetrehozas(){
      this.setOraPerc()
      
      if(this.datum==null && this.eloado_id=="" && this.helyszin_id==""){
        alert('Az időpont, előadó, helyszín megadása kötelező!');
        return;
      }

      const ev:string = this.datum.getFullYear().toString();
      const honap:string = this.padZero(this.datum.getMonth()+1)
      const nap:string = this.padZero(this.datum.getDate())
      const ora:string = this.padZero(this.datum.getHours())
      const perc:string = this.padZero(this.datum.getMinutes())
      
      const formataltDatum:string = `${ev}-${honap}-${nap} ${ora}:${perc}:00`

      let esemenyAdatok = {
        idopont:formataltDatum,
        eloado_id:this.eloado_id,
        helyszin_id:this.helyszin_id
      }

      this.esemenyService.esemenyLetrehozas(
      this.userAzonositasService.getAuthToken(),
      esemenyAdatok
      ).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres eseménylétrehozás!')
      },
      error:() => {
        this.openSnackbar('Sikertelen eseménylétrehozás!')
      }    
    });
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  setOraPerc(){
    this.datum.setHours(this.idopont_ora)
    this.datum.setMinutes(this.idopont_perc)
  }

  megseClick(){
    this.dialogRef.close();
  }
  
  openSnackbar(msg:string){
    this._snackBar.open(msg,undefined,{duration:1500});
  }
}

@Component({
  template: `<div class="d-block justify-content-center text-center p-3">
              <div class="justify-content-center align-items-center mb-2">
                <h1 mat-dialog-title >Esemény módosítása</h1>
                <h3>Esemény időpont</h3>
                <div class="d-flex align-items-center">
                  <mat-form-field class="mr-2" appearance="fill">
                    <mat-label>Dátum:</mat-label>
                    <input matInput [matDatepicker]="picker" class="felhasznalo-input datum" [(ngModel)]="datum" (dateChange)="setOraPerc()">
                    <mat-hint></mat-hint>
                    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>
                  <mat-form-field class="w-25">
                    <mat-label>Óra:</mat-label>
                    <input matInput  [(ngModel)]="idopont_ora" type='number' class="w-100 mr-4" min=0 max=23 (change)="setOraPerc()">
                  </mat-form-field>
                  <mat-form-field class="w-25 ml-3">
                    <mat-label>Perc:</mat-label>
                    <input matInput [(ngModel)]="idopont_perc" type='number' class="w-100" min=0 max=59 (change)="setOraPerc()">
                  </mat-form-field>
                </div>
                <h3>Előadó/helyszín</h3>
                <mat-form-field>
                  <mat-label>Előadó</mat-label>
                  <mat-select [(ngModel)]="eloado_id">
                    <mat-option *ngFor="let eloado of data.eloadok | keyvalue;" [value]="eloado.key">{{eloado.value}}</mat-option>
                  </mat-select> 
                </mat-form-field>
                <mat-form-field class="ml-3">
                  <mat-label>Helyszín</mat-label>
                  <mat-select [(ngModel)]="helyszin_id">
                    <mat-option *ngFor="let helyszin of data.helyszinek | keyvalue;" [value]="helyszin.key">{{helyszin.value}}</mat-option>
                  </mat-select> 
                </mat-form-field>
                <div mat-dialog-actions>
                <button class='justify-self-start border' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                <button class='justify-self-end border' mat-raised-button color='primary' (click)="esemenyModositas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule, MatDatepickerModule],
})
export class EsemenyModositas {

  id = ""
  datum = new Date()
  eloado_id = ""
  helyszin_id = ""
  idopont_ora = 0
  idopont_perc = 0

  constructor(public dialogRef: MatDialogRef<EsemenyModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public esemenyService:EsemenyService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any)
              {
                this.esemenyInputInit()
              }

  esemenyInputInit(){    
    let esemenyIdopontOraval = new Date(this.data.esemeny.idopont)
    const year = esemenyIdopontOraval.getFullYear();
    const month = esemenyIdopontOraval.getMonth(); // Months are zero-based, so add 1 to get the correct month
    const day = esemenyIdopontOraval.getDate();

    // Format the date as a string
    const esemenyIdopont = new Date(year, month, day);
    this.id = this.data.esemeny.id
    this.datum = esemenyIdopont
    this.idopont_ora = esemenyIdopontOraval.getHours()
    this.idopont_perc = esemenyIdopontOraval.getMinutes()
    this.eloado_id = this.data.esemeny.eloado_id
    this.helyszin_id = this.data.esemeny.helyszin_id
    this.setOraPerc()
  }

  setOraPerc(){
    this.datum.setHours(this.idopont_ora)
    this.datum.setMinutes(this.idopont_perc)
  }

  esemenyModositas(){
    this.setOraPerc()
      
    if(this.datum==null && this.eloado_id=="" && this.helyszin_id==""){
      alert('Az időpont, előadó, helyszín megadása kötelező!');
      return;
    }

    const ev:string = this.datum.getFullYear().toString();
    const honap:string = this.padZero(this.datum.getMonth()+1)
    const nap:string = this.padZero(this.datum.getDate())
    const ora:string = this.padZero(this.datum.getHours())
    const perc:string = this.padZero(this.datum.getMinutes())
    
    const formataltDatum:string = `${ev}-${honap}-${nap} ${ora}:${perc}:00`

    let esemenyAdatok = {
      idopont:formataltDatum,
      eloado_id:this.eloado_id,
      helyszin_id:this.helyszin_id
    }

    this.esemenyService.esemenyModositas(
    this.data.esemeny.id,
    this.userAzonositasService.getAuthToken(),
    esemenyAdatok
    ).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres eseménymódosítás!')
      },
      error:() => {
        this.openSnackbar('Sikertelen eseménymódosítás!')
      }    
    });
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  megseClick(){
    this.dialogRef.close();
  }
  
  openSnackbar(msg:string){
    this._snackBar.open(msg,undefined,{duration:1500});
  }
}

@Component({
  template: `<div class="d-block justify-content-center">
                <span class="d-flex justify-content-center" mat-dialog-title >Esemény törlése</span>
                <div mat-dialog-actions>
                  <button class="border" mat-raised-button color='primary' (click)="megseClick()">Mégse</button>
                  <button class="border" mat-raised-button color="warn" (click)="esemenyTorles()" cdkFocusInitial>Törlés</button>
                </div>
              </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule],
})
export class EsemenyTorles {

  constructor(public dialogRef: MatDialogRef<EsemenyTorles>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public esemenyService:EsemenyService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public esemenyId: number)
              {}

  esemenyTorles(){
    this.esemenyService.esemenyTorles(this.esemenyId,this.userAzonositasService.getAuthToken()).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres eseménytörlés!')
      },
      error:() => {
        this.openSnackbar('Sikertelen eseménytörlés!')
      }
    });  
  }

  megseClick(){
    this.dialogRef.close();
  }
  
  openSnackbar(msg:string){
    this._snackBar.open(msg,undefined,{duration:1500});
  }
}