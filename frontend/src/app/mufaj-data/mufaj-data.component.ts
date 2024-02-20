import { Component, Inject } from '@angular/core';
import { MufajService } from '../_szervizek/mufaj.service';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';
import { UserService } from '../_szervizek/user.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'mufaj-data',
  templateUrl: './mufaj-data.component.html',
  styleUrls: ['./mufaj-data.component.css']
})
export class MufajDataComponent {
  displayedColumns: string[] = ['id','nev','leiras','modositas','torles']
  dataSource: any[] = [];
  userService: any;

  constructor(private mufajService:MufajService,
              private dialog:MatDialog) {
    this.mufajBetoltes();
  }

  mufajBetoltes(){
    this.mufajService.osszesMufajLekerdezese().subscribe((valasz)=>{
        this.dataSource = valasz
        console.log(this.dataSource);
      }
    )
  }

  letrehozasAblak(enterAnimationDuration:string,exitAnimationDuration:string): void {
    this.dialog.open(MufajLetrehozas,{
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
  }

  modositasAblak(enterAnimationDuration:string,exitAnimationDuration:string,mufaj:any): void {
    this.dialog.open(MufajModositas,{
      data: { mufaj },
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
  }

  torlesAblak(enterAnimationDuration:string,exitAnimationDuration:string,mufaj:any): void {
    this.dialog.open(MufajTorles,{
      data: { mufaj },
      width:'250px',
      enterAnimationDuration,
      exitAnimationDuration});
  }

}

@Component({
  template: `<div class="d-block justify-content-center text-center">
                <div class="justify-content-center align-items-center mb-2">
                  <h1 mat-dialog-title >Műfaj létrehozása</h1>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Név:</mat-label>
                    <input matInput [(ngModel)]="nev" type='text' placeholder='Írjon be műfaj nevet!'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Leírás:</mat-label>
                    <textarea style="height:200px" matInput [(ngModel)]="leiras" placeholder='Írjon be műfaj leírást!'></textarea>
                  </mat-form-field>
                  <div mat-dialog-actions>
                  <button class='justify-self-start' mat-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end' mat-button color='primary' (click)="mufajLetrehozas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule],
})
export class MufajLetrehozas {

  nev = ""
  leiras = ""

  constructor(public dialogRef: MatDialogRef<MufajModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public mufajService:MufajService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: {mufaj: any})
              {}

  mufajLetrehozas(){
       const mufajAdatok = {
          nev:this.nev,
          leiras:this.leiras
        }
      this.mufajService.mufajLetrehozas(
      this.userAzonositasService.getAuthToken(),
      mufajAdatok
      ).subscribe({
      next:(response) => {
        this.dialogRef.close()
        this.openSnackbar(response.msg)
        this.mufajAlapertek();
      },
      error:(error) => {
        console.error('Hiba a műfaj létrehozás során', error);
        this.mufajAlapertek();
      }    
    });
  }

  megseClick(){
    this.dialogRef.close();
    this.mufajAlapertek();
  }
  
  openSnackbar(msg:string){
    this._snackBar.open(msg,undefined,{duration:1500});
  }

  mufajAlapertek(){
    this.nev = ""
    this.leiras = ""
  }
}

@Component({
  template: `<div class="d-block justify-content-center text-center">
                <div class="justify-content-center align-items-center mb-2">
                  <h1 mat-dialog-title >Műfaj módosítása</h1>
                  <h2>ID:{{data.mufaj.id}}</h2>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Név:</mat-label>
                    <input matInput [(ngModel)]="nev" type='text' [placeholder]='data.mufaj.nev'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Leírás:</mat-label>
                    <textarea style="height:200px" matInput [(ngModel)]="leiras" [placeholder]='data.mufaj.leiras'></textarea>
                  </mat-form-field>
                  <div mat-dialog-actions>
                  <button class='justify-self-start' mat-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end' mat-button color='primary' (click)="mufajModositas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule],
})
export class MufajModositas {

  id = ""
  nev = ""
  leiras = ""

  constructor(public dialogRef: MatDialogRef<MufajModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public mufajService:MufajService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: {mufaj: any})
              {}

  mufajModositas(){
       const mufajAdatok = {
          id:this.id==''?this.data.mufaj.id:this.id,
          nev:this.nev==''?this.data.mufaj.nev:this.nev,
          leiras:this.leiras==''?this.data.mufaj.leiras:this.leiras
        }
      this.mufajService.mufajModositas(
      mufajAdatok.id,
      this.userAzonositasService.getAuthToken(),
      mufajAdatok
      ).subscribe({
      next:(response) => {
        this.dialogRef.close()
        this.openSnackbar(response.msg)
        this.mufajAlapertek();
      },
      error:(error) => {
        console.error('Hiba a törlés során', error);
        this.mufajAlapertek();
      }    
    });
  }

  megseClick(){
    this.dialogRef.close();
    this.mufajAlapertek();
  }
  
  openSnackbar(msg:string){
    this._snackBar.open(msg,undefined,{duration:1500});
  }

  mufajAlapertek(){
    this.id = ""
    this.nev = ""
    this.leiras = ""
  }
}

@Component({
  template: `<div class="d-block justify-content-center">
                <span class="d-flex justify-content-center" mat-dialog-title >Műfaj törlése</span>
                <div mat-dialog-actions>
                  <button mat-button color='primary' (click)="megseClick()">Mégse</button>
                  <button mat-button color="warn" (click)="mufajTorles()" cdkFocusInitial>Törölni szeretném</button>
                </div>
              </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule],
})
export class MufajTorles {

  constructor(public dialogRef: MatDialogRef<MufajTorles>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public mufajService:MufajService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: {mufaj: any})
              {}

  mufajTorles(){
    this.mufajService.mufajTorles(this.data.mufaj.id,this.userAzonositasService.getAuthToken()).subscribe({
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