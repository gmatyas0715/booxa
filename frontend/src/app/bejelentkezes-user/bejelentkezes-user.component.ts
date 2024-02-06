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

  constructor(private userAzonositas:UserAzonositasService,private userService:UserService, private router:Router) {}

  userLogin(){
    let userBejelentkezesAdatok = {felhasznalonev: this.felhasznalonev, jelszo:this.jelszo};
    console.log(userBejelentkezesAdatok)
    this.userAzonositas.login(userBejelentkezesAdatok).subscribe({
      next:(response)=>{
        console.log('Sikeres bejelentkezés',response);
        this.userAzonositas.setAuthToken(response.token);
        this.userAzonositas.setUsername(response.felhasznalonev);
        this.userAzonositas.setUserId(response.user_id);
        console.log(this.userService.bejelentkezettUser)
        this.router.navigate(['/kezdooldal']);
      },
      error:(error) => {
        // Handle login failure
        console.error('Sikertelen bejelentkezés', error);
      }
    });
  }
}
