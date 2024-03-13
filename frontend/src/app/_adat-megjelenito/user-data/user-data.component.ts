import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAzonositasService } from '../../auth/user-azonositas.service';
import { UserService } from '../../_szervizek/user.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
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
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {
  displayedColumns: string[] = ['id','szerep','vezeteknev','keresztnev','email','nem','szuletesi_datum','username','modositas','torles']
  dataSource = new MatTableDataSource();
  szerepek = [];  

  constructor(private userService:UserService,
              private dialog:MatDialog,
              private userAzonositasService:UserAzonositasService) {
    this.userBetoltes();
    this.szerepOsszes();
    this.userAzonositasService.toltes = false
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

  userBetoltes() {
    this.userService.userOsszes(this.userAzonositasService.getAuthToken()).subscribe((valasz) => {
      console.log(valasz);
      
      this.dataSource.data = valasz;
    });
  }

  szerepOsszes(){
    this.userAzonositasService.szerepOsszes(this.userAzonositasService.getAuthToken()).subscribe((valasz)=>{
      this.szerepek = valasz;
      console.log(valasz);
      
    })
  }

  letrehozasAblak(enterAnimationDuration:string,exitAnimationDuration:string): void {
    const dialogref = this.dialog.open(UserLetrehozas,{
      data: this.szerepek,
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.userBetoltes()
      })
  }

  modositasAblak(enterAnimationDuration:string,exitAnimationDuration:string,user:any): void {
    const dialogref = this.dialog.open(UserModositas,{
      data: { 
              user: user,
              szerepek: this.szerepek 
      },
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.userBetoltes()
      })
  }

  torlesAblak(enterAnimationDuration:string,exitAnimationDuration:string,userId:number): void {
    const dialogref = this.dialog.open(UserTorles,{
      data: userId,
      width:'250px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.userBetoltes()
      })
  }

}

@Component({
  template: `<div class="d-block justify-content-center text-center p-3">
                <div class="justify-content-center align-items-center mb-2">
                  <h1 mat-dialog-title >User létrehozása</h1>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Vezetéknév:</mat-label>
                    <input matInput [(ngModel)]="vezeteknev" type='text' placeholder='Írjon be felhasználó vezetéknevet!'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Keresztnév:</mat-label>
                    <input type='text' matInput [(ngModel)]="keresztnev" placeholder='Írjon be felhasználó keresztnevet!'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Email:</mat-label>
                    <input type="email" matInput [(ngModel)]="email" placeholder='Írjon be felhasználó email-t!'>
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Nem</mat-label>
                    <mat-select [(ngModel)] = 'nem'>
                      <mat-option value="f">férfi</mat-option>
                      <mat-option value="n">nő</mat-option>
                    </mat-select> 
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Felhasználónév:</mat-label>
                    <input type="text" matInput [(ngModel)]="username" placeholder='Írja be a felhasználónevet!'>
                  </mat-form-field>
                  <mat-form-field appearance="fill" style="min-width: 200px;">
                    <mat-label>Születési dátum:</mat-label>
                    <input matInput [matDatepicker]="picker" class="felhasznalo-input datum" [(ngModel)]="szuletesi_datum" [min]="minEvDatum" [max]="maxEvDatum">
                    <mat-hint></mat-hint>
                    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>
                  <mat-form-field>
                    <mat-label>Szerep hozzáadása</mat-label>
                    <mat-select [(ngModel)]='szerep'>
                      <mat-option *ngFor="let szerep of szerepek;" [value]="szerep.name">{{szerep.name}}</mat-option>
                    </mat-select> 
                  </mat-form-field>
                  <div mat-dialog-actions>
                  <button class='justify-self-start border' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end border' mat-raised-button color='primary' (click)="userLetrehozas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule, MatDatepickerModule],
})
export class UserLetrehozas {

  vezeteknev = ""
  keresztnev = ""
  email = ""
  nem = ""
  username = ""
  szerep = ""
  jelenEv:number = new Date().getFullYear();
  maxEvDatum:string = this.jelenEv-18+"-01-01"
  minEvDatum:string = this.jelenEv-130+"-01-01"
  szuletesi_datum = new Date(this.minEvDatum)

  constructor(public dialogRef: MatDialogRef<UserModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public szerepek: any)
              {}

  userLetrehozas(){
      let userAdatok = {
        vezeteknev: this.vezeteknev,
        keresztnev: this.keresztnev,
        email: this.email,
        nem: this.nem,
        username: this.username,
        szuletesi_datum: this.szuletesi_datum.getFullYear()+'-'+(this.szuletesi_datum.getMonth()+1)+'-'+(this.szuletesi_datum.getDay()+1),
        szerep: this.szerep,
      }

      this.userService.userLetrehozas(
      this.userAzonositasService.getAuthToken(),
      userAdatok
      ).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres felhasználólétrehozás!')
      },
      error:() => {
        this.openSnackbar('Sikertelen felhasználólétrehozás!')
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
                <h1 mat-dialog-title >User módosítása</h1>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Vezetéknév:</mat-label>
                  <input matInput [(ngModel)]="vezeteknev" type='text' placeholder='Írjon be felhasználó vezetéknevet!'>
                </mat-form-field>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Keresztnév:</mat-label>
                  <input type='text' matInput [(ngModel)]="keresztnev" placeholder='Írjon be felhasználó keresztnevet!'>
                </mat-form-field>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Email:</mat-label>
                  <input type="email" matInput [(ngModel)]="email" placeholder='Írjon be felhasználó email-t!'>
                </mat-form-field>
                <mat-form-field>
                  <mat-label>Nem</mat-label>
                  <mat-select [(ngModel)] = 'nem'>
                    <mat-option value="f">férfi</mat-option>
                    <mat-option value="n">nő</mat-option>
                  </mat-select> 
                </mat-form-field>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Felhasználónév:</mat-label>
                  <input type="text" matInput [(ngModel)]="username" placeholder='Írja be a felhasználónevet!'>
                </mat-form-field>
                <mat-form-field appearance="fill" style="min-width: 200px;">
                  <mat-label>Születési dátum:</mat-label>
                  <input matInput [matDatepicker]="picker" class="felhasznalo-input datum" [(ngModel)]="szuletesi_datum" [min]="minEvDatum" [max]="maxEvDatum">
                  <mat-hint></mat-hint>
                  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>
                <mat-form-field>
                <mat-label>Szerep</mat-label>
                  <mat-select [(ngModel)]='szerep'>
                    <mat-option *ngFor="let szerep of data.szerepek;" [value]="szerep.name">{{szerep.name}}</mat-option>
                  </mat-select> 
                </mat-form-field>
                <div mat-dialog-actions>
                <button class='justify-self-start border' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                <button class='justify-self-end border' mat-raised-button color='primary' (click)="userModositas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule, MatDatepickerModule],
})
export class UserModositas {

  id = ""
  vezeteknev = ""
  keresztnev = ""
  email = ""
  nem = ""
  username = ""
  szuletesi_datum = new Date()
  szerep = ""
  jelenEv:number = new Date().getFullYear();
  maxEvDatum:string = this.jelenEv-18+"-01-01"
  minEvDatum:string = this.jelenEv-130+"-01-01"

  constructor(public dialogRef: MatDialogRef<UserModositas>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any)
              {
                this.userInputInit()
              }

  userInputInit(){
    this.vezeteknev = this.data.user.vezeteknev
    this.keresztnev = this.data.user.keresztnev
    this.email = this.data.user.email
    this.nem = this.data.user.nem
    this.username = this.data.user.username
    this.szuletesi_datum = new Date(this.data.user.szuletesi_datum)
    console.log(this.szuletesi_datum);
    
    this.szerep = this.data.user.roles[0].name
  }

  userModositas(){
      let userAdatok = {
        vezeteknev: this.vezeteknev,
        keresztnev: this.keresztnev,
        email: this.email,
        nem: this.nem,
        username: this.username,
        szuletesi_datum: this.szuletesi_datum.getFullYear()+'-'+(this.szuletesi_datum.getMonth()+1)+'-'+(this.szuletesi_datum.getDay()+1),
        szerep: this.szerep,
      }

      this.userService.userModositas(
        this.id = this.data.user.id,
        this.userAzonositasService.getAuthToken(),
        userAdatok
      ).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres felhasználómódosítás!')
      },
      error:() => {
        this.openSnackbar('Sikertelen felhasználómódosítás!')
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
                <span class="d-flex justify-content-center" mat-dialog-title >User törlése</span>
                <div mat-dialog-actions>
                  <button class="border" mat-raised-button color='primary' (click)="megseClick()">Mégse</button>
                  <button class="border" mat-raised-button color="warn" (click)="userTorles()" cdkFocusInitial>Törlés</button>
                </div>
              </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule],
})
export class UserTorles {

  constructor(public dialogRef: MatDialogRef<UserTorles>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public userId: string)
              {}

  userTorles(){
    this.userService.profilTorles(this.userId,this.userAzonositasService.getAuthToken()).subscribe({
      next:() => {
        this.dialogRef.close();
        this.openSnackbar('Sikeres felhasználótörlés!')
      },
      error:() => {
        this.openSnackbar('Sikertelen felhasználótörlés!')
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