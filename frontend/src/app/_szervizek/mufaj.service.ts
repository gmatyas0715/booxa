import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MufajService {

  constructor(private http:HttpClient) { }

  mufajokLekerdezese():Observable<string[]>{
    return this.http.get<string[]>('http://localhost:8000/api/mufaj-nevek')
  }
}
