import { Injectable } from '@angular/core';
import { UserModell } from '../_modellek/user-modell';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public bejelentkezettUser:UserModell = new UserModell();
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http:HttpClient,
              public cookieService:CookieService) {}
    
  userRegisztralas(userAdatok: any):Observable<any> {

    const body = JSON.stringify(userAdatok);

    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      Accept:'application/json'
    });

    return this.http.post<any>(this.apiUrl+'register',body,{headers})
  }

  userLetrehozas(userToken:string,userAdatok:any):Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${userToken}`
    })

    return this.http.post<any>(this.apiUrl+'user-letrehozas',userAdatok,{headers})
  }

  userModositas(userId:string,userToken:string,userAdatok:any):Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${userToken}`
    })

    return this.http.patch<any>(this.apiUrl+'user-modositas/'+userId,userAdatok,{headers})
  }

  userAdatok(userId:string,userToken:string):Observable<any>{

       const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${userToken}`
      })

    return this.http.get<any>(this.apiUrl+'userek/'+userId,{headers})
  }

  userOsszes(userToken:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    })

    return this.http.get<any>(this.apiUrl+'userek',{headers})
  }

  userFelhasznalonevek(){
    return this.http.get<any>(this.apiUrl+'user-emailek-felhasznalonevek')
  }

  profilSzerkesztes(userId:string,userToken:string,userAdatok: any,formTipusString:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userToken}`
    })

    userAdatok.form_tipus = formTipusString
    const body = JSON.stringify(userAdatok);

    return this.http.patch<any>(this.apiUrl+'userek/'+userId,body,{headers});
  }

  profilTorles(userId:string,userToken:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })
    return this.http.delete<any>(this.apiUrl+'userek/'+userId,{headers});
  }
}
