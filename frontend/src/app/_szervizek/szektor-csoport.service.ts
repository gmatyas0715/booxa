import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SzektorCsoportModell } from '../_modellek/szektor-csoport-modell';

@Injectable({
  providedIn: 'root'
})
export class SzektorCsoportService {

  constructor(private http:HttpClient) { }

  szektorCsoportok(esemenyId:string):Observable<SzektorCsoportModell[]> {
    return this.http.get<SzektorCsoportModell[]>('http://localhost:8000/api/kivalasztottSzektorcsoportok/'+esemenyId);
  }
}
