import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAzonositasService } from '../../_auth/user-azonositas.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CimService } from '../../_szervizek/cim.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'cim-data',
  templateUrl: './cim-data.component.html',
  styleUrls: ['./cim-data.component.css']
})
export class CimDataComponent {
  displayedColumns: string[] = ['id','iranyitoszam','telepules','kozterulet','hazszam','modositas','torles']
  dataSource = new MatTableDataSource()

  constructor(private cimService:CimService,
              private dialog:MatDialog,
              private userService:UserAzonositasService) {
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
    this.cimService.cimOsszes(this.userService.getAuthToken()).subscribe((valasz)=>{
      this.dataSource.data = valasz 
    })
  }

  letrehozasAblak(enterAnimationDuration:string,exitAnimationDuration:string): void {
    const dialogref = this.dialog.open(CimLetrehozas,{
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.cimBetoltes()
      })
  }

  modositasAblak(enterAnimationDuration:string,exitAnimationDuration:string,cim:any): void {
    const dialogref = this.dialog.open(CimModositas,{
      data: cim,
      width:'400px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.cimBetoltes()
      })
  }

  torlesAblak(enterAnimationDuration:string,exitAnimationDuration:string,cimId:number): void {
    const dialogref = this.dialog.open(CimTorles,{
      data: cimId,
      width:'250px',
      enterAnimationDuration,
      exitAnimationDuration});
          
      dialogref.afterClosed().subscribe(()=>{
        this.cimBetoltes()
      })
  }

}

@Component({
  template: `<div class="d-block justify-content-center text-center p-3">
                <div class="justify-content-center align-items-center mb-2">
                  <h1 mat-dialog-title >Cím létrehozása</h1>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Irányítószám:</mat-label>
                    <input matInput [(ngModel)]="iranyitoszam" type='text' placeholder='Írjon be irányítószámot!'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Település:</mat-label>
                    <input matInput [(ngModel)]="telepules" type='text' placeholder='Írjon be cím településnevet!'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Közterület:</mat-label>
                    <input matInput [(ngModel)]="kozterulet" type='text' placeholder='Írjon be cím közterületet!'>
                  </mat-form-field>
                  <mat-form-field class="ml-auto mr-auto w-75">
                    <mat-label>Házszám:</mat-label>
                    <input matInput [(ngModel)]="hazszam" type='text' placeholder='Írjon be cím házszámot!'>
                  </mat-form-field>
                  <div mat-dialog-actions>
                  <button class='justify-self-start border' mat-button color='warn' (click)="megseClick()">Mégse</button>
                  <button class='justify-self-end border' mat-button color='primary' (click)="cimLetrehozas()" cdkFocusInitial>Mentés</button>
              </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule],
})
export class CimLetrehozas {

  iranyitoszam = ""
  telepules = ""
  kozterulet = ""
  hazszam = ""

  constructor(public dialogRef: MatDialogRef<CimModositas>,
              public userAzonositasService:UserAzonositasService,
              public eloadoService:CimService,
              private _snackBar: MatSnackBar,
              private cimService:CimService,
              @Inject(MAT_DIALOG_DATA) public cim: any)
              {}

  cimLetrehozas(){

      let cimAdatok = {
        iranyitoszam:this.iranyitoszam,
        telepules:this.telepules,
        kozterulet:this.kozterulet,
        hazszam:this.hazszam,
      }

      this.cimService.cimLetrehozas(
      this.userAzonositasService.getAuthToken(),
      cimAdatok
      ).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres címlétrehozás!')
      },
      error:() => {
        this.openSnackbar('Sikertelen címlétrehozás!')
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
                <h1 mat-dialog-title >Cím módosítása</h1>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Irányítószám:</mat-label>
                  <input matInput [(ngModel)]="iranyitoszam" type='text' placeholder='Írjon be irányítószámot!'>
                </mat-form-field>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Település:</mat-label>
                  <input matInput [(ngModel)]="telepules" type='text' placeholder='Írjon be cím településnevet!'>
                </mat-form-field>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Közterület:</mat-label>
                  <input matInput [(ngModel)]="kozterulet" type='text' placeholder='Írjon be cím közterületet!'>
                </mat-form-field>
                <mat-form-field class="ml-auto mr-auto w-75">
                  <mat-label>Házszám:</mat-label>
                  <input matInput [(ngModel)]="hazszam" type='text' placeholder='Írjon be cím házszámot!'>
                </mat-form-field>
                <div mat-dialog-actions>
                <button class='justify-self-start border' mat-raised-button color='warn' (click)="megseClick()">Mégse</button>
                <button class='justify-self-end border' mat-raised-button color='primary' (click)="cimModositas()" cdkFocusInitial>Mentés</button>
            </div>
            </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule, MatInputModule, MatChipsModule, MatIconModule, MatSelectModule, MatOptionModule, CommonModule, MatIconModule],
})
export class CimModositas {

  id = ""
  iranyitoszam = ""
  telepules = ""
  kozterulet = ""
  hazszam = ""

  constructor(public dialogRef: MatDialogRef<CimModositas>,
              public userAzonositasService:UserAzonositasService,
              public cimService:CimService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public cim: any)
              {
                this.cimInputInit()
              }

  cimInputInit(){
    this.id = this.cim.id
    this.iranyitoszam = this.cim.iranyitoszam
    this.telepules = this.cim.telepules;
    this.kozterulet = this.cim.kozterulet;
    this.hazszam = this.cim.hazszam;
  }

  cimModositas(){

      let cimAdatok = {
        iranyitoszam:this.iranyitoszam,
        telepules:this.telepules,
        kozterulet:this.kozterulet,
        hazszam:this.hazszam,
      }

      this.cimService.cimModositas(
        this.id,
        this.userAzonositasService.getAuthToken(),
        cimAdatok
      ).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres címtörlés!')
      },
      error:() => {
        this.openSnackbar('Sikertelen címtörlés!')
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
                <span class="d-flex justify-content-center" mat-dialog-title >Cím törlése</span>
                <div mat-dialog-actions>
                  <button class="border" mat-raised-button color='primary' (click)="megseClick()">Mégse</button>
                  <button class="border" mat-raised-button color="warn" (click)="cimTorles()" cdkFocusInitial>Törlés</button>
                </div>
              </div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,FormsModule],
})
export class CimTorles {

  constructor(public dialogRef: MatDialogRef<CimTorles>,
              public userAzonositasService:UserAzonositasService,
              public cimService:CimService,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public cimId: number)
              {}

  cimTorles(){
    this.cimService.cimTorles(this.cimId,this.userAzonositasService.getAuthToken()).subscribe({
      next:() => {
        this.dialogRef.close()
        this.openSnackbar('Sikeres címtörlés!')
      },
      error:() => {
        this.openSnackbar('Sikertelen címtörlés!')
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