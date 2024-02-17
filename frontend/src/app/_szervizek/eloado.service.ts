import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EloadoService {

  constructor(private http:HttpClient){ }

  MAIN_URI = 'http://localhost:8000/api'

  eloadokNevekLekerdezese():Observable<string[]> {
    return this.http.get<string[]>(this.MAIN_URI+'/eloado-nevek');
  } 
  
  eloadoKepUrl(kepNev: string): string{
    return this.MAIN_URI+'/eloado-kep/'+kepNev;
  }
}
