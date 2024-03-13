import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAzonositasService } from '../../auth/user-azonositas.service';
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
import { CimService } from 'src/app/_szervizek/cim.service';


@Component({
  selector: 'helyszin-data',
  templateUrl: './helyszin-data.component.html',
  styleUrls: ['./helyszin-data.component.css']
})
export class HelyszinDataComponent {
  displayedColumns: string[] = ['id','nev','cim','kapacitas','arkategoria','helyszin_kep_eleres','helyszin_kep','svg_kep_eleres','svg_kep','modositas','torles']
  dataSource = new MatTableDataSource()
  cimek:Map<number,string> = new Map<number,string>();
  userService: any;

  constructor(private dialog:MatDialog,
              public helyszinSzerviz:HelyszinService,
              public cimSzerviz:CimService,
              public userAzonositas:UserAzonositasService) {
    this.cimBetoltes();
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

  cimBetoltes(){
    this.cimSzerviz.cimOsszes(this.userService.getAuthToken()).subscribe((valasz)=>{
      let osszCimMap = new Map<number,string>();
      valasz.forEach((cim)=>{
        osszCimMap.set(cim.id,cim.iranyitoszam+', '+cim.telepules+' '+cim.kozterulet+', '+cim.hazszam);
      })
      this.cimek = osszCimMap
      this.helyszinBetoltes();
    })
  }

  helyszinBetoltes() {
    this.helyszinSzerviz.helyszinOsszes(this.userAzonositas.getAuthToken()).subscribe((valasz) => {
      this.dataSource.data = valasz.map((valasz: any) => {

        return {
          id: valasz.id,
          nev: valasz.nev,
          cim: this.cimek.get(valasz.cim_id),
          cim_id: valasz.cim_id,
          kapacitas: valasz.kapacitas,
          arkategoria: valasz.arkategoria,
          helyszin_kep_eleres: valasz.helyszin_kep_eleres,
          svg_kep_eleres: valasz.svg_kep_eleres
        };
      });
    });
  }

  letrehozasAblak(enterAnimationDuration:string,exitAnimationDuration:string): void {
    const dialogref = this.dialog.open(HelyszinLetrehozas,{
      data: this.cimek,
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.helyszinBetoltes()
      })
  }

  modositasAblak(enterAnimationDuration:string,exitAnimationDuration:string,helyszin:any): void {
    const dialogref = this.dialog.open(HelyszinModositas,{
      data: { 
              helyszin: helyszin,
              cimek: this.cimek 
      },
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.helyszinBetoltes()
      })
  }

  torlesAblak(enterAnimationDuration:string,exitAnimationDuration:string,helyszinId:number): void {
    const dialogref = this.dialog.open(HelyszinTorles,{
      data: helyszinId,
      width:'250px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.helyszinBetoltes()
      })
  }

}

@Component({
  template: `<div class="d-block justify-content-center text-center p-3">
                <div class="justify-content-center align-items-center mb-2">
                  <h1 mat-dialog-title >Helyszín létrehozása</h1>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Név:</mat-label>
                    <input matInput [(ngModel)]="nev" type='text' placeholder='Írjon be helyszín nevet!'>
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Cím</mat-label>
                    <mat-select [(ngModel)]="cim_id">
                      <mat-option *ngFor="let cim of cimek | keyvalue;" [value]="cim.key">{{cim.value}}</mat-option>
                    </mat-select> 
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Kapacitás:</mat-label>
                    <input matInput [(ngModel)]="kapacitas" type='text' placeholder='Adja meg a kapacitást!'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Árkategória:</mat-label>
                    <input type="number" step="0.1" matInput [(ngModel)]="arkategoria" min='0.1' max='9.9' placeholder='Írja be a helyszín árkategóriáját!'>
                  </mat-form-field>
                  <h2>Helyszín képfeltöltés</h2>
                  <input type='file' (change)='kepKivalasztas($event)' accept="image/*">
                  <h2>SVG képfeltöltés</h2>
                  <input type='file' (change)='svgKivalasztas($event)' accept=".svg">
                  <hr>
                  <div mat-dialog-actions>
                  <button class='justify-self-start border' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end border' mat-raised-button color='primary' (click)="helyszinLetrehozas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule],
})
export class HelyszinLetrehozas {

  nev = ""
  cim_id = ""
  kapacitas = ""
  arkategoria = ""
  helyszin_kep: File | null = null;
  svg_kep: File | null = null;

  constructor(public dialogRef: MatDialogRef<HelyszinModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public helyszinService:HelyszinService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public cimek: any)
              {}

  helyszinLetrehozas(){

      let eloadoAdatok: FormData = new FormData();
      
      if(this.nev!="" && this.cim_id!="" && this.kapacitas!="" && this.arkategoria!="" && this.svg_kep!==null){
        eloadoAdatok.append('nev',this.nev);
        eloadoAdatok.append('cim_id',this.cim_id);
        eloadoAdatok.append('kapacitas',this.kapacitas);
        eloadoAdatok.append('arkategoria',this.arkategoria)
        eloadoAdatok.append('svg_file',this.svg_kep)
      }

      else{
        alert('A név, cím, kapacitás, árkategória, svg kép megadása kötelező!');
        return;
      }
      
      if(parseFloat(this.arkategoria)<1 || parseFloat(this.arkategoria)>9.9){
        alert('Árkategória 1.0 - 9.9 között kell legyen 1 tizedes pontossággal')
        return
      }

      if (this.helyszin_kep){
        eloadoAdatok.append('kep_file',this.helyszin_kep);
      }

      this.helyszinService.helyszinLetrehozas(
      this.userAzonositasService.getAuthToken(),
      eloadoAdatok
      ).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres helyszínlétrehozás!')
      },
      error:() => {
        this.openSnackbar('Sikertelen helyszínlétrehozás!')
      }    
    });
  }

  kepKivalasztas(event:any){
    this.helyszin_kep = event.target.files[0];    
  }

  svgKivalasztas(event:any){
    this.svg_kep = event.target.files[0];    
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
              <h1 mat-dialog-title >Helyszín módosítása</h1>
              <mat-form-field class="ml-auto mr-auto w-75">
                <mat-label>Név:</mat-label>
                <input matInput [(ngModel)]="nev" type='text' placeholder='Írjon be helyszín nevet!'>
              </mat-form-field>
              <mat-form-field>
                <mat-label>Cím</mat-label>
                <mat-select [(ngModel)]="cim_id">
                  <mat-option *ngFor="let cim of data.cimek | keyvalue;" [value]="cim.key">{{cim.value}}</mat-option>
                </mat-select> 
              </mat-form-field>
              <mat-form-field class="ml-auto mr-auto w-75">
                <mat-label>Kapacitás:</mat-label>
                <input matInput [(ngModel)]="kapacitas" type='text' placeholder='Adja meg a kapacitást!'>
              </mat-form-field>
              <mat-form-field class="ml-auto mr-auto w-75">
                <mat-label>Árkategória:</mat-label>
                <input type="number" step="0.1" matInput [(ngModel)]="arkategoria" min='0.1' max='9.9' placeholder='Írja be a helyszín árkategóriáját!'>
              </mat-form-field>
              <h2>Helyszín képfeltöltés</h2>
              <input type='file' (change)='kepKivalasztas($event)' accept="image/*">
              <h2>SVG képfeltöltés</h2>
              <input type='file' (change)='svgKivalasztas($event)' accept=".svg">
              <hr>
                <div mat-dialog-actions>
                <button class='justify-self-start border' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                <button class='justify-self-end border' mat-raised-button color='primary' (click)="helyszinModositas()" cdkFocusInitial>Mentés</button>
            </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule],
})
export class HelyszinModositas {

  id = ""
  nev = ""
  cim_id = ""
  kapacitas = ""
  arkategoria = ""
  svg_kep_eleres = ""
  helyszin_kep_eleres = ""
  helyszin_kep: File | null = null;
  svg_kep: File | null = null;

  constructor(public dialogRef: MatDialogRef<HelyszinModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public helyszinService:HelyszinService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any)
              {
                this.helyszinInputInit()
              }

  helyszinInputInit(){
    this.id = this.data.helyszin.id
    this.nev = this.data.helyszin.nev
    this.cim_id = this.data.helyszin.cim_id
    this.kapacitas = this.data.helyszin.kapacitas
    this.arkategoria = this.data.helyszin.arkategoria
    this.nev = this.data.helyszin.nev;
  }

  helyszinModositas(){
    console.log(this.cim_id);
    
      let eloadoAdatok: FormData = new FormData();

      if(this.nev!="" && this.cim_id!="" && this.kapacitas!="" && this.arkategoria!=""){
        eloadoAdatok.append('nev',this.nev);
        eloadoAdatok.append('cim_id',this.cim_id);
        eloadoAdatok.append('kapacitas',this.kapacitas);
        eloadoAdatok.append('arkategoria',this.arkategoria)
        eloadoAdatok.append('_method','PATCH');
      }

      else{
        alert('A név, cím, kapacitás, árkategória megadása kötelező!');
        return;
      }
      
      if(parseFloat(this.arkategoria)<0.1 || parseFloat(this.arkategoria)>9.9){
        alert('Árkategória 1.0 - 9.9 között kell legyen 1 tizedes pontossággal')
        return
      }

      if (this.svg_kep){
        eloadoAdatok.append('svg_file',this.svg_kep);
      }

      if (this.helyszin_kep){
        eloadoAdatok.append('kep_file',this.helyszin_kep);
      }

      this.helyszinService.helyszinModositas(
        this.id,
        this.userAzonositasService.getAuthToken(),
        eloadoAdatok
      ).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres helyszínmódosítás!')
      },
      error:() => {
        this.openSnackbar('Sikertelen helyszínmódosítás!')
      }    
    });
  }

  kepKivalasztas(event:any){
    this.helyszin_kep = event.target.files[0];    
  }

  svgKivalasztas(event:any){
    this.svg_kep = event.target.files[0];    
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
                  <button class="border" mat-raised-button color="warn" (click)="helyszinTorles()" cdkFocusInitial>Törlés</button>
                </div>
              </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule],
})
export class HelyszinTorles {

  constructor(public dialogRef: MatDialogRef<HelyszinTorles>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public helyszinService:HelyszinService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public helyszinId: number)
              {}

  helyszinTorles(){
    this.helyszinService.helyszinTorles(this.helyszinId,this.userAzonositasService.getAuthToken()).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres helyszíntörlés!')
      },
      error:() => {
        this.openSnackbar('Sikertelen helyszíntörlés!')
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