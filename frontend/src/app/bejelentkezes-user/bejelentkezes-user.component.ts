import { Component } from '@angular/core';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes-user',
  templateUrl: './bejelentkezes-user.component.html',
  styleUrls: ['./bejelentkezes-user.component.css']
})
export class BejelentkezesUserComponent {
  
  felhasznalonev:string = "";
  jelszo:string = "";

  constructor(private userAzonositas:UserAzonositasService, private router:Router) {}

  userLogin(){
    let userBejelentkezesAdatok = {felhasznalonev: this.felhasznalonev, jelszo:this.jelszo};
    console.log(userBejelentkezesAdatok)
    this.userAzonositas.login(userBejelentkezesAdatok).subscribe(
      (response)=>{
        console.log('Sikeres bejelentkezés',response);
        this.userAzonositas.userToken = response.token;
        console.log(response.token)
        this.router.navigate(['/kezdooldal']);
      },
      (error) => {
        // Handle login failure
        console.error('Sikertelen bejelentkezés', error);
      }
    )
  }
}
