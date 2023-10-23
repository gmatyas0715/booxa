import { Component } from '@angular/core';
import { UserModell } from '../_modellek/user-modell';
import { UserService } from '../_szervizek/user.service';

@Component({
  selector: 'app-bejelentkezes-user',
  templateUrl: './bejelentkezes-user.component.html',
  styleUrls: ['./bejelentkezes-user.component.css']
})
export class BejelentkezesUserComponent {
  
  public user:UserModell = new UserModell();

  constructor(public szerviz:UserService) {
    
  }

  LoginGomb(){
    this.szerviz.Login(this.user.felhasznalonev,this.user.jelszo);
  }
}
