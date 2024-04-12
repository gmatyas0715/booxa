import { Injectable } from '@angular/core';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';
import { SzektorAlegysegModell } from '../_modellek/szektor-alegyseg-modell';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KosarService {

  constructor(private cookieService:CookieService,
              private http:HttpClient) {}

  jegyAdatLista: JegyAdatModell[] = [];
  private readonly RENDELES_COOKIE:string = 'rendelesCookie'

  jegyAdatListaBetoltes(){
    if (!this.cookieService.check(this.RENDELES_COOKIE))return
    this.http.get<JegyAdatModell[]>('http://localhost:8000/api/jegy-adat-lista/'+this.cookieService.get(this.RENDELES_COOKIE)).subscribe((jegyAdatLista:JegyAdatModell[])=>{
      this.jegyAdatLista = jegyAdatLista
      if (this.jegyAdatLista.length==0) this.cookieService.delete(this.RENDELES_COOKIE)
    })
  }

  getKosarOsszar(szervizAr:number=390):number{
    if (this.jegyAdatLista.length==0)szervizAr=0;
    let kosarOsszar:number = 0;
    this.jegyAdatLista.forEach(jegy=>{
      kosarOsszar+=this.getTetelOsszarByItem(jegy);
    });
    return kosarOsszar+szervizAr;
  }

  kosarbaHelyezes(jegyAdatok:JegyAdatModell[]){
    console.log(jegyAdatok);
    const body = jegyAdatok
    if (this.cookieService.get(this.RENDELES_COOKIE)){
      this.http.post('http://localhost:8000/api/jegyek-kosarba-helyezese/'+this.cookieService.get(this.RENDELES_COOKIE),body).subscribe(()=>{
        this.jegyAdatListaBetoltes()
      })
    }
    else{
      this.http.post('http://localhost:8000/api/jegyek-kosarba-helyezese/'+0,body).subscribe((valasz:any)=>{
        this.cookieService.set(this.RENDELES_COOKIE,valasz.rendeles_id)
        this.jegyAdatListaBetoltes()
      });
    }
  }

  tetelTorles(jegy_id:number){
    console.log(jegy_id);
    this.http.delete('http://localhost:8000/api/tetel-torles/'+jegy_id).subscribe(()=>{
      this.jegyAdatListaBetoltes()
    })
  }

  getTetelOsszarByItem(kosarElem:JegyAdatModell):number{
    return kosarElem.szektorAlegysegJegyar
  }
  
  getTetelOsszarByIndex(index:number):number{
    const kosarElem:JegyAdatModell = this.jegyAdatLista[index];
    return kosarElem.szektorAlegysegJegyar
  }

  ulohelySzamGeneralas(jegyFoglaltDarab:number,szektorAlegyseg:SzektorAlegysegModell):number[]{
    let ulohelyek:number[] = [];
    let helySzam = 1;
    while (ulohelyek.length != jegyFoglaltDarab) {
      if (szektorAlegyseg.jegy_maradek){
        if (!szektorAlegyseg.jegy_maradek.includes(helySzam)){
          ulohelyek.push(helySzam);
        }
      }else{
        ulohelyek.push(helySzam)  
      }    
      helySzam++      
    }
    return ulohelyek;
  }
}
