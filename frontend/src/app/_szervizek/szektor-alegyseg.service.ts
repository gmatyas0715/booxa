import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SzektorAlegysegService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8000/api/';

  szektorAlegysegFoglaltsag(esemenyId:string):Observable<any>{
    return this.http.get<any>(this.apiUrl+'szektor-alegyseg-foglaltsag-check/'+esemenyId);
  }

}
