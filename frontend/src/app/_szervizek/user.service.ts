import { Injectable } from '@angular/core';
import { UserModell } from '../_modellek/user-modell';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public bejelentkezettUser:UserModell = new UserModell();
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http:HttpClient,
              public cookieService:CookieService,
              public router:Router) {}
    
  userRegisztralas(userAdatok: any) {

    const body = JSON.stringify(userAdatok);

    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      Accept:'application/json'
    });

    return this.http.post(this.apiUrl+'register',body,{headers})
  }

  userAdatok(userId:string,userToken:string):Observable<any>{

       const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${userToken}`
      })

    return this.http.get<any>(this.apiUrl+'userek/'+userId,{headers})
  }

  userFelhasznalonevek(){
    return this.http.get<any>(this.apiUrl+'user-felhasznalonevek')
  }

  profilTorles(userId:string,userToken:string){
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userToken}`
    })
    this.http.delete(this.apiUrl+'userek/'+userId,{headers}).subscribe(
      (response) => {
        console.log('Delete successful', response);
        this.cookieService.deleteAll();
        this.router.navigate(['/kezdooldal']);
      },
      (error) => {
        console.error('Error deleting item', error);
      })
  }
}
