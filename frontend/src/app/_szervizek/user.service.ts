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
      nem:"f",
      szuletesiDatum:new Date(1991,9,20),
      felhasznalonev:"kovacsbela",
      jelszo:"kovbela",
      profilKep: new Blob()
  });
    this.regisztraltUserek.push({
      felhasznaloID:2,
      vezeteknev:"Horváth",
      keresztnev:"Mariann",
      email:"horvmariann666@gmail.com",
      nem:"n",
      szuletesiDatum:new Date(1978,10,21),
      felhasznalonev:"horvmariann",
      jelszo:"horvimari",
      profilKep: new Blob()
    });
      
    this.bejelentkezettStatusz = sessionStorage.getItem("felhasznalonev") != null;
    if (this.bejelentkezettStatusz) {
      this.bejelentkezettUser.felhasznalonev = sessionStorage.getItem("felhasznalonev")??"";
      this.bejelentkezettUser.jelszo = sessionStorage.getItem("jelszo")??"";
      this.bejelentkezettUser.email = sessionStorage.getItem("email")??"";
      this.bejelentkezettUser.vezeteknev = sessionStorage.getItem("vezeteknev")??"";
      this.bejelentkezettUser.keresztnev = sessionStorage.getItem("keresztnev")??"";
      this.bejelentkezettUser.nem = sessionStorage.getItem("nem")??"";
      this.bejelentkezettUser.szuletesiDatum = new Date(sessionStorage.getItem("szuletesiDatum")??"");
    }
  }

  Login(felhasznalonevInput:string,jelszoInput:string){
    for (const user of this.regisztraltUserek) {
      if (user.felhasznalonev==felhasznalonevInput&&user.jelszo==jelszoInput) {
        this.bejelentkezettStatusz=true;
        this.bejelentkezettUser = user;
        this.NavigalasKezdooldal();
        sessionStorage.setItem("felhasznalonev", this.bejelentkezettUser.felhasznalonev);
        sessionStorage.setItem("jelszo", this.bejelentkezettUser.jelszo);
        sessionStorage.setItem("email", this.bejelentkezettUser.email);
        sessionStorage.setItem("vezeteknev", this.bejelentkezettUser.vezeteknev);
        sessionStorage.setItem("keresztnev", this.bejelentkezettUser.keresztnev);
        sessionStorage.setItem("nem", this.bejelentkezettUser.nem);
        sessionStorage.setItem("szuletesiDatum", this.bejelentkezettUser.szuletesiDatum.toString());
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
