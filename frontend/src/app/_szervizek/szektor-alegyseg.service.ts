import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SzektorAlegysegService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8000/api/';

  szektorAlegysegHelyCheck():Observable<number[]>{
    return this.http.get<number[]>(this.apiUrl+'szektor-alegyseg-szabad-helyek');
  }

  szektorAlegysegFoglaltsag(esemenyId:string):Observable<any>{
    return this.http.get<any>(this.apiUrl+'szektor-alegyseg-foglaltsag-check/'+esemenyId);
  }

}
