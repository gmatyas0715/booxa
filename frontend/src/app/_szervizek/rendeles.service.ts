import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RendelesModell } from '../_modellek/rendeles-modell';
import { KosarService } from './kosar.service';
import { UserAzonositasService } from './user-azonositas.service';

@Injectable({
  providedIn: 'root'
})
export class RendelesService {

  constructor(public http:HttpClient,
              public userAzonositasSzerviz:UserAzonositasService,
              public kosarSzerviz:KosarService) { }

  rendelesElkuldes(rendelesAdatok:RendelesModell){

    const body = JSON.stringify(rendelesAdatok);
    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${this.userAzonositasSzerviz.getAuthToken()}`
    }) 

    return this.http.post('http://localhost:8000/api/rendelesElkuldes',body,{headers});
  }

  
  rendelesAdatOsszeallitas(szamlazasAdat:object):RendelesModell{

    let jegyAdatok = this.rendelesJegyReszadatExtrakcio()

    let rendelesBackendnek: RendelesModell = new RendelesModell(
                          this.userAzonositasSzerviz.getAuthToken(),
                          szamlazasAdat,
                          jegyAdatok);
              
    console.log(rendelesBackendnek)
    return rendelesBackendnek;
  }

  rendelesJegyReszadatExtrakcio():string{
    var reszadatLista:any[] = []
    this.kosarSzerviz.jegyAdatLista.forEach((jegyAdat)=>{
      jegyAdat.ulohely.forEach(ulo_hely => {
        let jegyAdatElem = {
          esemeny_id: jegyAdat.esemeny.id,
          jegy_darabszam: jegyAdat.jegyDarabszam,
          szektor_id: jegyAdat.szektor.id,
          szektor_alegyseg_id: jegyAdat.szektorAlegyseg.id,
          ulo_hely: ulo_hely,
        }
        reszadatLista.push(jegyAdatElem);
      });
    })
    return JSON.stringify(reszadatLista);
}
}
