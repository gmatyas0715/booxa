import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RendelesModell } from '../_modellek/rendeles-modell';
import { KosarService } from './kosar.service';
import { UserAzonositasService } from '../_auth/user-azonositas.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendelesService {

  constructor(public http:HttpClient,
              public userAzonositasSzerviz:UserAzonositasService,
              public kosarSzerviz:KosarService) { }

  korabbiVasarlasokLekerdezese():Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${this.userAzonositasSzerviz.getAuthToken()}`
    }) 

    return this.http.get<any>('http://localhost:8000/api/korabbi-vasarlasok',{headers})
  }

  rendelesElkuldes(rendelesAdatok:RendelesModell){

    const body = JSON.stringify(rendelesAdatok);
    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${this.userAzonositasSzerviz.getAuthToken()}`
    }) 

    return this.http.post('http://localhost:8000/api/rendeles-elkuldes/'+this.kosarSzerviz.rendelesCookie,body,{headers});
  }

  
  rendelesAdatOsszeallitas(szamlazasAdatok:object):RendelesModell{

    let rendelesBackendnek: RendelesModell = new RendelesModell(
                          this.userAzonositasSzerviz.getAuthToken(),
                          szamlazasAdatok);
              
    return rendelesBackendnek;
  }

  sessionData(sessionId:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.userAzonositasSzerviz.getAuthToken()}`
    }) 
    return this.http.get('http://localhost:8000/api/session-data?sessionId='+sessionId,{headers});
  }
}
