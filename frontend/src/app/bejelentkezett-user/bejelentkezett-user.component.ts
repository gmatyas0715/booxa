import { Component } from '@angular/core';
import { UserService } from '../_szervizek/user.service';

@Component({
  selector: 'app-bejelentkezett-user',
  templateUrl: './bejelentkezett-user.component.html',
  styleUrls: ['./bejelentkezett-user.component.css']
})
export class BejelentkezettUserComponent {
  constructor(public szerviz:UserService) {

  }
  LogoutGomb(){
    this.szerviz.Logout()
  }
}
