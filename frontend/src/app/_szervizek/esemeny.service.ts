import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EsemenyService {

  constructor(
    private http: HttpClient,
  ) { 

  }

  eloadoAdatok(eloado:string,helyszin:string):Observable<any>{
    console.log(eloado,' ',helyszin)
    const params = new HttpParams()
      .set('eloado',eloado)
      .set('helyszin',helyszin);

      console.log(params);

      return this.http.get('http://localhost:8000/api/esemenyKereso',{params});
  }
  esemenyFrissites(){

  }
}
