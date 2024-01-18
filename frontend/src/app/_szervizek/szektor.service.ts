import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SzektorModell } from '../_modellek/szektor-modell';

@Injectable({
  providedIn: 'root'
})
export class SzektorService {

  constructor(private http:HttpClient) { }

  szektorok(esemenyId:string):Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/kivalasztott-szektorok/'+esemenyId);
  }
}
