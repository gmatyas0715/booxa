import { Injectable } from '@angular/core';
import { UserModell } from '../_modellek/user-modell';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public regisztraltUserek:UserModell[] = [];
  public bejelentkezettStatusz:boolean = false;
  public bejelentkezettUser:UserModell = new UserModell();

  constructor(
    private http: HttpClient,
    private router: Router) {

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
