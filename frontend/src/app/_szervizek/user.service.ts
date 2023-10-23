import { Injectable } from '@angular/core';
import { UserModell } from '../_modellek/user-modell';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public regisztraltUserek:UserModell[] = [];
  public bejelentkezettStatusz:boolean = false;

  constructor() {
    this.regisztraltUserek.push({felhasznaloID:1,
                                vezeteknev:"Kovács",
                                keresztnev:"Béla",
                                email:"kovbela69@gmail.com",
                                nem:"férfi",
                                szuletesiDatum:new Date(1991,9,20),
                                felhasznalonev:"kovacsbela",
                                jelszo:"kovbela"});
    this.regisztraltUserek.push({felhasznaloID:2,
                                vezeteknev:"Horváth",
                                keresztnev:"Mariann",
                                email:"horvmariann666@gmail.com",
                                nem:"nő",
                                szuletesiDatum:new Date(1978,10,21),
                                felhasznalonev:"horvmariann",
                                jelszo:"horvimari"});
  }

  Login(userInput:string,passwordInput:string){
    let sikeresLogin = this.regisztraltUserek.filter((user)=>{
      user.felhasznalonev==userInput&&user.jelszo==passwordInput
    });
    if (sikeresLogin){
      this.bejelentkezettStatusz=true;
    }
  }
}
