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

    return this.http.post('http://localhost:8000/api/rendeles',body,{headers});
  }

  
  rendelesAdatOsszeallitas(szamlazasAdat:object,bankkartyaAdat:object):RendelesModell{

    let jegyAdatok = this.rendelesJegyReszadatExtrakcio()

    let rendelesBackendnek: RendelesModell = new RendelesModell(
                          this.userAzonositasSzerviz.getAuthToken(),
                          bankkartyaAdat,
                          szamlazasAdat,
                          jegyAdatok);
              
    console.log(rendelesBackendnek)
    return rendelesBackendnek;
  }

  rendelesJegyReszadatExtrakcio():any[]{
    var reszadatLista:any[] = []
    this.kosarSzerviz.jegyAdatLista.forEach((jegyAdat)=>{
        let jegyAdatElem = {
          esemeny_id: jegyAdat.esemeny.id,
          jegy_darabszam: jegyAdat.jegyDarabszam,
          szektor_id: jegyAdat.szektor.id,
          szektor_alegyseg_id: jegyAdat.szektorAlegyseg.id,
          ulo_helyek: jegyAdat.ulohely
        }
        reszadatLista.push(jegyAdatElem);
    })
    return reszadatLista;
}
}
