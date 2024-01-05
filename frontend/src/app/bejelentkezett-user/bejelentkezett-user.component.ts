import { Component } from '@angular/core';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';
import { UserService } from '../_szervizek/user.service';

@Component({
  selector: 'app-bejelentkezett-user',
  templateUrl: './bejelentkezett-user.component.html',
  styleUrls: ['./bejelentkezett-user.component.css']
})
export class BejelentkezettUserComponent {
  constructor(public userAzonositas:UserAzonositasService,public userService:UserService) {}

  LogoutGomb(){
    this.userAzonositas.logout()
  }
}
