import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelyszinService {

  constructor(private http:HttpClient){ }

  helyszinNevekLekerdezese():Observable<any> {
    return this.http.get('http://localhost:8000/api/helyszin-nevek');
  } 

  helyszinKepUrl(kepNev: string): string{
    return 'http://localhost:8000/helyszin-kep/'+kepNev;
  }

  helyszinSvgKepUrl(kepNev: string): string{
    return 'http://localhost:8000/svg-helyszin-kep/'+kepNev;
  }
}
