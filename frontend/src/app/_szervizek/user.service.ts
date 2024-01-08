import { Injectable } from '@angular/core';
import { UserModell } from '../_modellek/user-modell';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public bejelentkezettUser:UserModell = new UserModell();
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http:HttpClient) {}
    
  userRegisztralas(userAdatok: any) {

    const body = JSON.stringify(userAdatok);

    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      Accept:'application/json'
    });

    return this.http.post(this.apiUrl+'register',body,{headers})
  }

  userAdatok(userId:string,userToken:string):Observable<any>{

    const requestOptions = {
       headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${userToken}`
      }),
    };

    return this.http.get<any>(this.apiUrl+'userek/'+userId,requestOptions)
  }

  userFelhasznalonevek():Observable<any>{
    return this.http.get<any>(this.apiUrl+'user-felhasznalonevek')
  }




}
