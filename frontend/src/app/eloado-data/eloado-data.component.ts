import { Component, Inject, ViewChild } from '@angular/core';
import { MufajService } from '../_szervizek/mufaj.service';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';
import { UserService } from '../_szervizek/user.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EloadoService } from '../_szervizek/eloado.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'eloado-data',
  templateUrl: './eloado-data.component.html',
  styleUrls: ['./eloado-data.component.css']
})
export class EloadoDataComponent {
  displayedColumns: string[] = ['id','nev','mufaj','leiras','arkategoria','kep_eleres','kep','modositas','torles']
  dataSource = new MatTableDataSource()
  mufajok:Map<number,string> = new Map<number,string>();
  userService: any;

  constructor(private eloadoService:EloadoService,
              private mufajService: MufajService,
              private dialog:MatDialog,
              public eloadoSzerviz:EloadoService) {
    this.eloadoBetoltes();
    this.mufajBetoltes();
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

  mufajBetoltes(){
    this.mufajService.osszesMufajLekerdezese().subscribe((valasz)=>{
      let osszMufajMap = new Map<number,string>();
      valasz.forEach((mufaj)=>{
        osszMufajMap.set(mufaj.id,mufaj.nev);
      })
      this.mufajok = osszMufajMap      
    })
  }

  eloadoBetoltes() {
    this.eloadoService.eloadoOsszes().subscribe((valasz) => {
      this.dataSource.data = valasz.map((eloado: any) => {
        let mufajMap = new Map<number,string>()
        eloado.mufaj.forEach((mufaj: any) => {
          mufajMap.set(mufaj.id, mufaj.nev);
        });
  
        return {
          id: eloado.id,
          nev: eloado.nev,
          mufaj: mufajMap, 
          leiras: eloado.leiras,
          arkategoria: eloado.arkategoria,
          kep_eleres: eloado.kep_eleres
        };
      });
    });
  }

  letrehozasAblak(enterAnimationDuration:string,exitAnimationDuration:string): void {
    const dialogref = this.dialog.open(EloadoLetrehozas,{
      data: this.mufajok,
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.eloadoBetoltes()
      })
  }

  modositasAblak(enterAnimationDuration:string,exitAnimationDuration:string,eloado:any): void {
    const dialogref = this.dialog.open(EloadoModositas,{
      data: { 
              eloado: eloado,
              mufajok: this.mufajok 
      },
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.eloadoBetoltes()
      })
  }

  torlesAblak(enterAnimationDuration:string,exitAnimationDuration:string,eloadoId:number): void {
    const dialogref = this.dialog.open(EloadoTorles,{
      data: eloadoId,
      width:'250px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.eloadoBetoltes()
      })
  }

}

@Component({
  template: `<div class="d-block justify-content-center text-center p-3">
                <div class="justify-content-center align-items-center mb-2">
                  <h1 mat-dialog-title >Előadó létrehozása</h1>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Név:</mat-label>
                    <input matInput [(ngModel)]="nev" type='text' placeholder='Írjon be előadó nevet!'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Leírás:</mat-label>
                    <textarea style="height:200px" matInput [(ngModel)]="leiras" placeholder='Írjon be előadó leírást!'></textarea>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Árkategória:</mat-label>
                    <input type="number" step="0.1" matInput [(ngModel)]="arkategoria" min='0.1' max='9.9' placeholder='Írja be az előadó árkategóriáját!'>
                  </mat-form-field>
                  <h2>Előadó képfeltöltés</h2>
                  <input type='file' accept="image/*" (change)='fajlKivalasztas($event)'>
                  <hr>
                  <mat-form-field>
                    <mat-label>Műfajok hozzáadása</mat-label>
                    <mat-select (selectionChange)="mufajHozzadas($event.value)" >
                      <mat-option *ngFor="let mufaj of osszMufaj | keyvalue;" [value]="mufaj">{{mufaj.value}}</mat-option>
                    </mat-select> 
                  </mat-form-field>
                  <mat-chip-listbox>
                    <mat-chip-option *ngFor="let mufaj of mufajok | keyvalue" (removed)="mufajEltavolitas(mufaj)">{{mufaj.value}}
                      <button matChipRemove>
                        <mat-icon>cancel</mat-icon>
                      </button>
                    </mat-chip-option>
                  </mat-chip-listbox>
                  <div mat-dialog-actions>
                  <button class='justify-self-start' mat-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end' mat-button color='primary' (click)="eloadoLetrehozas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule],
})
export class EloadoLetrehozas {

  nev = ""
  leiras = ""
  arkategoria = ""
  mufajok = new Map<number,string>()
  file: File | null = null;

  constructor(public dialogRef: MatDialogRef<EloadoModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public eloadoService:EloadoService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public osszMufaj: any)
              {}

  eloadoLetrehozas(){

      let eloadoAdatok: FormData = new FormData();
      let mufajStringIdList:string = Array.from(this.mufajok.keys()).toString();
      
      if(this.nev!="" && this.leiras!="" && this.arkategoria!="" && mufajStringIdList!=""){
        eloadoAdatok.append('nev',this.nev);
        eloadoAdatok.append('leiras',this.leiras);
        eloadoAdatok.append('arkategoria',this.arkategoria)
        eloadoAdatok.append('mufajok',mufajStringIdList)
      }

      else{
        alert('A név, leírás, árkategória, műfajok megadása kötelező!');
        return;
      }
      
      if(parseFloat(this.arkategoria)<0.1 || parseFloat(this.arkategoria)>9.9){
        alert('Árkategória 1.0 - 9.9 között kell legyen 1 tizedes pontossággal')
        return
      }

      if (this.file){
        eloadoAdatok.append('file',this.file,this.file.name);
      }

      this.eloadoService.eloadoLetrehozas(
      this.userAzonositasService.getAuthToken(),
      eloadoAdatok
      ).subscribe({
      next:(response) => {
        this.dialogRef.close()
        this.openSnackbar(response.msg)
      },
      error:(error) => {
        console.error('Hiba a műfaj létrehozás során', error);
      }    
    });
  }

  fajlKivalasztas(event:any){
    this.file = event.target.files[0];    
  }

  mufajEltavolitas(mufaj:any){
    this.mufajok.delete(mufaj.key)
    this.osszMufaj.set(mufaj.key,mufaj.value)
    
  }

  mufajHozzadas(mufaj:any){
    this.mufajok.set(mufaj.key,mufaj.value)
    this.osszMufaj.delete(mufaj.key)
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
                <h1 mat-dialog-title >Előadó módosítása</h1>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Név:</mat-label>
                  <input matInput [(ngModel)]="nev" type='text' placeholder='Írjon be előadó nevet!'>
                </mat-form-field>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Leírás:</mat-label>
                  <textarea style="height:200px" matInput [(ngModel)]="leiras" placeholder='Írjon be előadó leírást!'></textarea>
                </mat-form-field>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Árkategória:</mat-label>
                  <input type="number" step="0.1" matInput [(ngModel)]="arkategoria" min='0.1' max='9.9' placeholder='Írja be az előadó árkategóriáját!'>
                </mat-form-field>
                <h2>Előadó képfeltöltés</h2>
                <input type='file' accept="image/*" (change)='fajlKivalasztas($event)'>
                <hr>
                <mat-form-field>
                  <mat-label>Műfajok hozzáadása</mat-label>
                  <mat-select (selectionChange)="mufajHozzadas($event.value)" >
                    <mat-option *ngFor="let mufaj of osszMufaj | keyvalue;" [value]="mufaj">{{mufaj.value}}</mat-option>
                  </mat-select> 
                </mat-form-field>
                <mat-chip-listbox>
                  <mat-chip-option *ngFor="let mufaj of eloadoMufajok | keyvalue" (removed)="mufajEltavolitas(mufaj)">{{mufaj.value}}
                    <button matChipRemove>
                      <mat-icon>cancel</mat-icon>
                    </button>
                  </mat-chip-option>
                </mat-chip-listbox>
                <div mat-dialog-actions>
                <button class='justify-self-start' mat-button color='warn' (click)="megseClick()">Mégse</button>
                <button class='justify-self-end' mat-button color='primary' (click)="eloadoModositas()" cdkFocusInitial>Mentés</button>
            </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule],
})
export class EloadoModositas {

  id = ""
  nev = ""
  leiras = ""
  arkategoria = ""
  nevTouched = false
  leirasTouched = false
  arkategoriaTouched = false
  eloadoMufajok = new Map<number,string>()
  osszMufaj = new Map<number,string>()
  file: File | null = null;

  constructor(public dialogRef: MatDialogRef<EloadoModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public eloadoService:EloadoService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any)
              {
                this.eloadoInputInit()
                this.osszMufajModositas()
              }

  eloadoInputInit(){
    this.id = this.data.eloado.id
    this.nev = this.data.eloado.nev;
    this.leiras = this.data.eloado.leiras;
    this.arkategoria = this.data.eloado.arkategoria;
  }

  osszMufajModositas(){
    this.eloadoMufajok = new Map(
      JSON.parse(
       JSON.stringify(Array.from(this.data.eloado.mufaj))
      )
    );
    this.osszMufaj = new Map(
      JSON.parse(
       JSON.stringify(Array.from(this.data.mufajok))
      )
    );
    this.eloadoMufajok.forEach((value,key) => {
      this.osszMufaj.delete(key);
    });
  }

  eloadoModositas(){

      let eloadoAdatok: FormData = new FormData();
      let mufajStringIdList:string = Array.from(this.eloadoMufajok.keys()).toString();

      if(this.nev!="" && this.leiras!="" && this.arkategoria!="" && mufajStringIdList!=""){
        eloadoAdatok.append('nev',this.nev);
        eloadoAdatok.append('leiras',this.leiras);
        eloadoAdatok.append('arkategoria',this.arkategoria)
        eloadoAdatok.append('mufajok',mufajStringIdList);
        eloadoAdatok.append('_method','PATCH');
      }

      else{
        alert('A név, leírás, árkategória, műfajok megadása kötelező!');
        return;
      }
      
      if(parseFloat(this.arkategoria)<0.1 || parseFloat(this.arkategoria)>9.9){
        alert('Árkategória 1.0 - 9.9 között kell legyen 1 tizedes pontossággal')
        return
      }

      if (this.file){
        eloadoAdatok.append('file',this.file,this.file.name);
      }

      this.eloadoService.eloadoModositas(
        this.id,
        this.userAzonositasService.getAuthToken(),
        eloadoAdatok
      ).subscribe({
      next:(response) => {
        this.dialogRef.close()
        this.openSnackbar(response.msg)
      },
      error:(error) => {
        console.error('Hiba a műfaj létrehozás során', error);
      }    
    });
  }

  fajlKivalasztas(event:any){
    this.file = event.target.files[0];    
  }

  mufajEltavolitas(mufaj:any){
    this.eloadoMufajok.delete(mufaj.key)
    this.osszMufaj.set(mufaj.key,mufaj.value)
    
  }

  mufajHozzadas(mufaj:any){
    this.eloadoMufajok.set(mufaj.key,mufaj.value)
    this.osszMufaj.delete(mufaj.key)
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
                  <button mat-button color='primary' (click)="megseClick()">Mégse</button>
                  <button mat-button color="warn" (click)="eloadoTorles()" cdkFocusInitial>Törölni szeretném</button>
                </div>
              </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule],
})
export class EloadoTorles {

  constructor(public dialogRef: MatDialogRef<EloadoTorles>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public eloadoService:EloadoService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public eloadoId: number)
              {}

  eloadoTorles(){
    this.eloadoService.eloadoTorles(this.eloadoId,this.userAzonositasService.getAuthToken()).subscribe({
      next:(response) => {
        this.dialogRef.close();
        this.openSnackbar(response.msg)
      },
      error:(error) => {
        console.error('Hiba a törlés során', error);
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