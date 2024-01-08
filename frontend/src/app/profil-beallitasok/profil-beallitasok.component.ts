import { Component } from '@angular/core';
import { UserService } from '../_szervizek/user.service';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profil-beallitasok',
  templateUrl: './profil-beallitasok.component.html',
  styleUrls: ['./profil-beallitasok.component.css']
})
export class ProfilBeallitasokComponent {

  public belepesAdatSzerkesztheto:boolean = false
  public emailSzerkesztheto:boolean = false
  public szemelyesAdatSzerkesztheto:boolean = false

  constructor(public userService: UserService,
              public userAzonositas:UserAzonositasService,
              public dialog:MatDialog) {
    this.profilAdatok();
  }

  openDialog(enterAnimationDuration:string,exitAnimationDuration:string): void {
    this.dialog.open(ProfilTorles,{width:'250px',enterAnimationDuration,exitAnimationDuration});
  }

  profilAdatok(){
    this.userService
      .userAdatok(this.userAzonositas.getUserId(),this.userAzonositas.getAuthToken())
      .subscribe((valasz)=>{
        this.userService.bejelentkezettUser = valasz
    })
  }
}

@Component({
  selector: 'profil-torles',
  template: `<div class="d-block justify-content-center">
              <h1 mat-dialog-title >Profil törlése</h1>
              <div mat-dialog-actions>
                <button mat-button (click)="megseClick()">Mégse</button>
                <button mat-button (click)="profilTorles()" cdkFocusInitial>Törölni szeretném</button>
              </div>
            <div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule],
})
export class ProfilTorles {

  constructor(public dialogRef: MatDialogRef<ProfilTorles>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public cookieService:CookieService)
              {}

  profilTorles(){
    this.userService.profilTorles(this.userAzonositasService.getUserId(),this.userAzonositasService.getAuthToken());
    this.dialogRef.close();
  }

  megseClick(){
    this.dialogRef.close();
  }
}