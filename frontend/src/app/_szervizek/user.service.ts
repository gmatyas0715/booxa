import { Injectable } from '@angular/core';
import { UserModell } from '../_modellek/user-modell';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public bejelentkezettUser:UserModell = new UserModell();
  private apiUrl = 'http://localhost:8000/api/userek/';

  constructor(private http:HttpClient) {}

  userAdatok(userId:string,userToken:string):Observable<any>{

    const requestOptions = {
       headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${userToken}`
      }),
    };

    return this.http.get<any>(this.apiUrl+userId,requestOptions)
  }
}
