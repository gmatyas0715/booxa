import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAzonositasService } from '../../_szervizek/user-azonositas.service';
import { UserService } from '../../_szervizek/user.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HelyszinService } from '../../_szervizek/helyszin.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EsemenyService } from 'src/app/_szervizek/esemeny.service';
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
      width:'400px',
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
      width:'400px',
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
                  <mat-form-field appearance="fill" style="min-width: 200px;">
                    <mat-label>Esemény dátum:</mat-label>
                    <input matInput [matDatepicker]="picker" class="felhasznalo-input datum" [(ngModel)]="idopont">
                    <mat-hint></mat-hint>
                    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Előadó</mat-label>
                    <mat-select [(ngModel)]="eloado_id">
                      <mat-option *ngFor="let eloado of data.eloadok | keyvalue;" [value]="eloado.key">{{eloado.value}}</mat-option>
                    </mat-select> 
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Helyszín</mat-label>
                    <mat-select [(ngModel)]="helyszin_id">
                      <mat-option *ngFor="let helyszin of data.helyszinek | keyvalue;" [value]="helyszin.key">{{helyszin.value}}</mat-option>
                    </mat-select> 
                  </mat-form-field>
                  <div mat-dialog-actions>
                  <button class='justify-self-start border' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end border' mat-raised-button color='primary' (click)="helyszinLetrehozas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule, MatDatepickerModule],
})
export class EsemenyLetrehozas {
  idopont = ""
  eloado_id = ""
  helyszin_id = ""

  constructor(public dialogRef: MatDialogRef<EsemenyModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public helyszinService:HelyszinService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any)
              {}

  helyszinLetrehozas(){

      let esemenyAdatok: FormData = new FormData();
      
      if(this.idopont!="" && this.eloado_id!="" && this.helyszin_id!=""){
        esemenyAdatok.append('idopont',this.idopont);
        esemenyAdatok.append('eloado_id',this.eloado_id);
        esemenyAdatok.append('helyszin_id',this.helyszin_id);
      }

      else{
        alert('Az időpont, előadó, helyszín megadása kötelező!');
        return;
      }

      this.helyszinService.helyszinLetrehozas(
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
              <mat-form-field appearance="fill" style="min-width: 200px;">
                <mat-label>Esemény dátum:</mat-label>
                <input matInput [matDatepicker]="picker" class="felhasznalo-input datum" [(ngModel)]="idopont">
                <mat-hint></mat-hint>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
              <mat-form-field>
                <mat-label>Előadó</mat-label>
                <mat-select [(ngModel)]="eloado_id">
                  <mat-option *ngFor="let eloado of data.eloadok | keyvalue;" [value]="eloado.key">{{eloado.value}}</mat-option>
                </mat-select> 
              </mat-form-field>
              <mat-form-field>
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
  idopont = ""
  eloado_id = ""
  helyszin_id = ""

  constructor(public dialogRef: MatDialogRef<EsemenyModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public helyszinService:HelyszinService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any)
              {
                this.esemenyInputInit()
              }

  esemenyInputInit(){
    
    this.id = this.data.esemeny.id
    this.idopont = this.data.esemeny.idopont
    this.eloado_id = this.data.esemeny.eloado_id
    this.helyszin_id = this.data.esemeny.helyszin_id

    
    console.log(this.data.esemeny.eloado_id+' '+this.data.esemeny.helyszin_id+' '+this.data.esemeny.idopont);
  }

  esemenyModositas(){
    
      let esemenyAdatok: FormData = new FormData();

      if(this.idopont!="" && this.eloado_id!="" && this.helyszin_id!=""){
        esemenyAdatok.append('idopont',this.idopont);
        esemenyAdatok.append('eloado_id',this.eloado_id);
        esemenyAdatok.append('helyszin_id',this.helyszin_id);
      }

      else{
        alert('Az időpont, előadó, helyszín megadása kötelező!');
        return;
      }
      
      this.helyszinService.helyszinModositas(
        this.id,
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

  megseClick(){
    this.dialogRef.close();
  }
  
  openSnackbar(msg:string){
    this._snackBar.open(msg,undefined,{duration:1500});
  }
}

@Component({
  template: `<div class="d-block justify-content-center">
                <span class="d-flex justify-content-center" mat-dialog-title >Műfaj törlése</span>
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
              public helyszinService:HelyszinService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public helyszinId: number)
              {}

  esemenyTorles(){
    this.helyszinService.helyszinTorles(this.helyszinId,this.userAzonositasService.getAuthToken()).subscribe({
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