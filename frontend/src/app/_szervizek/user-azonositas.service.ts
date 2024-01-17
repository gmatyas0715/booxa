import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAzonositasService {
  private apiUrl = 'http://localhost:8000/api/login';
  private readonly USER_TOKEN_COOKIE:string = "userToken";
  private readonly USERNAME_COOKIE:string = "username";
  private readonly USER_ID_COOKIE:string = "userId";

  constructor(private http:HttpClient,private cookieService:CookieService) {}

  setAuthToken(token:string){
    this.cookieService.set(this.USER_TOKEN_COOKIE,token);
  }

  getAuthToken():string{
    return this.cookieService.get(this.USER_TOKEN_COOKIE);
  }

  deleteAuthToken(){
    this.cookieService.delete(this.USER_TOKEN_COOKIE)
  }

  setUsername(username:string){
    this.cookieService.set(this.USERNAME_COOKIE,username);
  }

  getUsername():string{
    return this.cookieService.get(this.USERNAME_COOKIE);
  }

  deleteUsername(){
    this.cookieService.delete(this.USERNAME_COOKIE)
  }

  setUserId(userId:string){
    this.cookieService.set(this.USER_ID_COOKIE,userId);
  }

  getUserId():string{
    return this.cookieService.get(this.USER_ID_COOKIE);
  }

  deleteUserId(){
    this.cookieService.delete(this.USER_ID_COOKIE);
  }

  login(userBejelentkezesAdatok: { felhasznalonev: string; jelszo: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers as needed
    });

    // Create the HTTP request with the data in the body
    const body = JSON.stringify(userBejelentkezesAdatok);

    return this.http.post<any>(this.apiUrl, body,{ headers });
  }

  logout(){
    this.deleteAuthToken();
  }
}
