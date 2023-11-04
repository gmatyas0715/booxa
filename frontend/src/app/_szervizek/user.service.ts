import { Injectable } from '@angular/core';
import { UserModell } from '../_modellek/user-modell';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public regisztraltUserek:UserModell[] = [];
  public bejelentkezettStatusz:boolean = false;
  public bejelentkezettUser:UserModell = new UserModell();

  constructor(private router: Router) {
    this.regisztraltUserek.push({
      felhasznaloID:1,
      vezeteknev:"Kovács",
      keresztnev:"Béla",
      email:"kovbela69@gmail.com",
      nem:"férfi",
      szuletesiDatum:new Date(1991,9,20),
      felhasznalonev:"kovacsbela",
      jelszo:"kovbela",
      profilKep:""}
      );
    this.regisztraltUserek.push({
      felhasznaloID:2,
      vezeteknev:"Horváth",
      keresztnev:"Mariann",
      email:"horvmariann666@gmail.com",
      nem:"nő",
      szuletesiDatum:new Date(1978,10,21),
      felhasznalonev:"horvmariann",
      jelszo:"horvimari",
      profilKep:""});
      
    this.bejelentkezettStatusz = sessionStorage.getItem("user") != null;
    if (this.bejelentkezettStatusz) {
      this.bejelentkezettUser.felhasznalonev = sessionStorage.getItem("user")??"";
    }
  }

  Login(felhasznalonevInput:string,jelszoInput:string){
    for (const user of this.regisztraltUserek) {
      if (user.felhasznalonev==felhasznalonevInput&&user.jelszo==jelszoInput) {
        this.bejelentkezettStatusz=true;
        this.bejelentkezettUser = user;
        this.NavigalasKezdooldal();
        sessionStorage.setItem("user", this.bejelentkezettUser.felhasznalonev);
      }
    }
  }

  Logout(){
    for (const user of this.regisztraltUserek) {
        this.bejelentkezettStatusz=false;
        sessionStorage.clear();
    }
  }

  NavigalasKezdooldal(){
    this.router.navigate(['/kezdooldal']);
  }
}
