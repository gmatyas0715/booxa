import { Component } from '@angular/core';
import { UserModell } from '../_modellek/user-modell';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes-user',
  templateUrl: './bejelentkezes-user.component.html',
  styleUrls: ['./bejelentkezes-user.component.css']
})
export class BejelentkezesUserComponent {
  
  public user:UserModell = new UserModell();
  userBejelentkezesAdatok = {felhasznalonev: this.user.felhasznalonev, jelszo:this.user.jelszo};

  constructor(private userAzonositas:UserAzonositasService, private router:Router) {}

  LoginGomb(){
    this.userAzonositas.Login(this.userBejelentkezesAdatok).subscribe(
      (response)=>{
        console.log('Sikeres bejelentkezés',response);
        this.router.navigate(['/kezdooldal']);
      },
      (error) => {
        // Handle login failure
        console.error('Sikertelen bejelentkezés', error);
      }
    )
  }
}
