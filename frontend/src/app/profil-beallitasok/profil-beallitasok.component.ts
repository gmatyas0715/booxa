import { Component } from '@angular/core';
import { UserService } from '../_szervizek/user.service';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';

@Component({
  selector: 'app-profil-beallitasok',
  templateUrl: './profil-beallitasok.component.html',
  styleUrls: ['./profil-beallitasok.component.css']
})
export class ProfilBeallitasokComponent {

  public belepesAdatSzerkesztheto:boolean = false
  public emailSzerkesztheto:boolean = false
  public szemelyesAdatSzerkesztheto:boolean = false

  constructor(public userService: UserService,public userAzonositas:UserAzonositasService) {
    this.profilAdatok();
  }

  profilAdatok(){
    this.userService
      .userAdatok(this.userAzonositas.getUserId(),this.userAzonositas.getAuthToken())
      .subscribe((valasz)=>{
        this.userService.bejelentkezettUser = valasz
    })
  }
}
