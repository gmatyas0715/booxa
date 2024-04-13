import { Component, Inject, ViewChild } from '@angular/core';
import { MufajService } from '../../_szervizek/mufaj.service';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAzonositasService } from '../../_auth/user-azonositas.service';
import { UserService } from '../../_szervizek/user.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'mufaj-data',
  templateUrl: './mufaj-data.component.html',
  styleUrls: ['./mufaj-data.component.css']
})
export class MufajDataComponent {
  displayedColumns: string[] = ['id','nev','leiras','modositas','torles']
  dataSource = new MatTableDataSource()

  constructor(private mufajService:MufajService,
              private dialog:MatDialog,
              private userAzonositas:UserAzonositasService) {
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
    this.mufajService.mufajOsszes(this.userAzonositas.getAuthToken()).subscribe((valasz)=>{
        this.dataSource.data = valasz
      }
    )
  }

  letrehozasAblak(enterAnimationDuration:string,exitAnimationDuration:string): void {
    const dialogref = this.dialog.open(MufajLetrehozas,{
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.mufajBetoltes()
      })
  }

  modositasAblak(enterAnimationDuration:string,exitAnimationDuration:string,mufaj:any): void {
    const dialogref = this.dialog.open(MufajModositas,{
      data: mufaj ,
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
    
      dialogref.afterClosed().subscribe(()=>{
        this.mufajBetoltes()
      })
  }

  torlesAblak(enterAnimationDuration:string,exitAnimationDuration:string,mufajId:any): void {
    const dialogref = this.dialog.open(MufajTorles,{
      data: mufajId,
      width:'250px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.mufajBetoltes()
      })
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
                  <button class='justify-self-start border"' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end border"' mat-raised-button color='primary' (click)="mufajLetrehozas()" cdkFocusInitial>Mentés</button>
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
              private _snackBar: MatSnackBar)
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
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres műfajlétrehozás!')
        this.mufajAlapertek();
      },
      error:() => {
        this.openSnackbar('Sikertelen műfajlétrehozás!')
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
                  <h2>ID:{{mufaj.id}}</h2>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Név:</mat-label>
                    <input matInput [(ngModel)]="nev" type='text' [placeholder]='mufaj.nev'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Leírás:</mat-label>
                    <textarea style="height:200px" matInput [(ngModel)]="leiras" [placeholder]='mufaj.leiras'></textarea>
                  </mat-form-field>
                  <div mat-dialog-actions>
                  <button class='justify-self-start border' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end border' mat-raised-button color='primary' (click)="mufajModositas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule],
})
export class MufajModositas {

  nev = ""
  leiras = ""

  constructor(public dialogRef: MatDialogRef<MufajModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public mufajService:MufajService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public mufaj: any)
              {}

  mufajModositas(){
       const mufajAdatok = {
          id:this.mufaj.id,
          nev:this.nev==''?this.mufaj.nev:this.nev,
          leiras:this.leiras==''?this.mufaj.leiras:this.leiras
        }
      this.mufajService.mufajModositas(
      mufajAdatok.id,
      this.userAzonositasService.getAuthToken(),
      mufajAdatok
      ).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres műfajmódosítás!')
        this.mufajAlapertek();
      },
      error:() => {
        this.openSnackbar('Sikertelen műfajmódosítás!')
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
  template: `<div class="d-block justify-content-center">
                <span class="d-flex justify-content-center" mat-dialog-title >Műfaj törlése</span>
                <div mat-dialog-actions>
                  <button class="border" mat-raised-button color='primary' (click)="megseClick()">Mégse</button>
                  <button class="border" mat-raised-button color="warn" (click)="mufajTorles()" cdkFocusInitial>Törlés</button>
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
              @Inject(MAT_DIALOG_DATA) public mufajId: any)
              {}

  mufajTorles(){
    this.mufajService.mufajTorles(this.mufajId,this.userAzonositasService.getAuthToken()).subscribe({
      next:() => {
        this.dialogRef.close();
        this.openSnackbar('Sikeres műfajtörlés!')
      },
      error:() => {
        this.openSnackbar('Sikertelen műfajtörlés!')
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