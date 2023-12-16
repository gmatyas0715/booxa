import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EloadoService {

  constructor(private http:HttpClient){ }

  eloadokNevekLekerdezese():Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8000/api/eloado-nevek');
  } 
  
  eloadoKepUrl(kepNev: string): string{
    return 'http://localhost:8000/eloado-kep/'+kepNev;
  }
}
