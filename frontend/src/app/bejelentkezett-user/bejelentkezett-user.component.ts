import { Component } from '@angular/core';
import { UserAzonositasService } from '../_auth/user-azonositas.service';
import { UserService } from '../_szervizek/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bejelentkezett-user',
  templateUrl: './bejelentkezett-user.component.html',
  styleUrls: ['./bejelentkezett-user.component.css']
})
export class BejelentkezettUserComponent {

  szerep:string =""

  constructor(public userAzonositas:UserAzonositasService,
              public userService:UserService,
              public router:Router,
              private _snackbar:MatSnackBar) {
    this.userAzonositas.getSzerep().subscribe((valasz)=>{
      this.szerep = valasz.szerep
    })
  }

  navigacio(szerep:string){
    if (!this.router.url.startsWith('/data/')){
      this.router.navigate([szerep=='admin'?'data/user':'data/esemeny'])
      this.userAzonositas.toltes = true
    }
  }

  logout(){
    this._snackbar.open('Sikeresen kijelentkeztél!','',{duration:1500})
    this.userAzonositas.logout()
  }
}
