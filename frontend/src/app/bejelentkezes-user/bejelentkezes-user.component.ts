import { Component } from '@angular/core';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';
import { Router } from '@angular/router';
import { UserService } from '../_szervizek/user.service';

@Component({
  selector: 'app-bejelentkezes-user',
  templateUrl: './bejelentkezes-user.component.html',
  styleUrls: ['./bejelentkezes-user.component.css']
})
export class BejelentkezesUserComponent {
  
  felhasznalonev:string = "aansteysd";
  jelszo:string = "xA4)ij7}UPde2";
  errorMessage = false;

  constructor(private userAzonositas:UserAzonositasService,private userService:UserService, private router:Router) {}

  userLogin(){
    let userBejelentkezesAdatok = {felhasznalonev: this.felhasznalonev, jelszo:this.jelszo};
    console.log(userBejelentkezesAdatok)
    this.userAzonositas.login(userBejelentkezesAdatok).subscribe({
      next:(valasz)=>{
        console.log('Sikeres bejelentkezés',valasz);
        this.userAzonositas.setAuthToken(valasz.token);
        this.userAzonositas.setUserId(valasz.userId);
        this.userAzonositas.setUsername(valasz.felhasznalonev);
        console.log(this.userService.bejelentkezettUser)
        this.router.navigate(['/kezdooldal']);
      },
      error:(error) => {
        this.errorMessage = true
        this.felhasznalonev = "";
        this.jelszo = "";
        console.error('Sikertelen bejelentkezés', error);
      }
    });
  }
}
