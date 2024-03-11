import { Component } from '@angular/core';
import { UserAzonositasService } from '../auth/user-azonositas.service';
import { UserService } from '../_szervizek/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezett-user',
  templateUrl: './bejelentkezett-user.component.html',
  styleUrls: ['./bejelentkezett-user.component.css']
})
export class BejelentkezettUserComponent {

  szerep:string =""

  constructor(public userAzonositas:UserAzonositasService,
              public userService:UserService,
              public router:Router) {
    this.userAzonositas.getSzerep().subscribe((valasz)=>{
      this.szerep = valasz.szerep
    })
  }

  navigacioEsemenyekhez(){
    if (!this.router.url.startsWith('/data/')){
      this.router.navigate(['data/esemeny'])
      this.userAzonositas.toltes = true
    }
  }
}
