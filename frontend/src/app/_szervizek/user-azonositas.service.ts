import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAzonositasService {
  private apiUrl = 'http://localhost:8000/api/login';
  public userToken:string = "f";
  constructor(private http:HttpClient) {}

  login(userBejelentkezesAdatok: { felhasznalonev: string; jelszo: string }): Observable<any> {
    console.log(userBejelentkezesAdatok)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers as needed
    });

    // Create the HTTP request with the data in the body
    const body = JSON.stringify(userBejelentkezesAdatok);

    return this.http.post<any>(this.apiUrl, body,{ headers });
  }
}
