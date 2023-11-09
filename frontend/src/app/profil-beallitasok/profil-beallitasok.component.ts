import { Component } from '@angular/core';
import { UserService } from '../_szervizek/user.service';

@Component({
  selector: 'app-profil-beallitasok',
  templateUrl: './profil-beallitasok.component.html',
  styleUrls: ['./profil-beallitasok.component.css']
})
export class ProfilBeallitasokComponent {

  constructor(public szerviz: UserService) {
  }
}
