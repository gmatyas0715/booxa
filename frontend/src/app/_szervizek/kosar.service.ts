import { Injectable } from '@angular/core';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';

@Injectable({
  providedIn: 'root'
})
export class KosarService {

  constructor() {
    
  }

  jegyAdatLista: JegyAdatModell[] = [];

  getKosarOsszar(szervizAr:number=390):number{
    if (this.jegyAdatLista.length==0)szervizAr=0;
    let kosarOsszar:number = 0;
    this.jegyAdatLista.forEach(jegy=>{
      kosarOsszar+=this.getTetelOsszarByItem(jegy);
    });
    return kosarOsszar+szervizAr;
  }

  kosarbaHelyezes(jegyAdat:JegyAdatModell){
    this.jegyAdatLista.push(jegyAdat);
  }

  tetelTorles(index:number){
    this.jegyAdatLista.splice(index,1);
  }

  getTetelOsszarByItem(kosarElem:JegyAdatModell):number{
    return kosarElem.jegyDarabszam*kosarElem.szektorAlegyseg.szektor_alegyseg_jegyar;
  }
  
  getTetelOsszarByIndex(index:number):number{
    const kosarElem:JegyAdatModell = this.jegyAdatLista[index];
    return kosarElem.jegyDarabszam*kosarElem.szektorAlegyseg.szektor_alegyseg_jegyar;
  }

  jegyDarabCsokkentes(index:number){
    let foglaltUlohelyek:JegyAdatModell = this.jegyAdatLista[index];
    if (foglaltUlohelyek.jegyDarabszam==1) return;
    foglaltUlohelyek.jegyDarabszam!--;
    foglaltUlohelyek.ulohely.pop();
  }

  jegyDarabNoveles(index:number){
    this.jegyAdatLista[index].jegyDarabszam!++;
    this.ulohelyHozzaadas(index);
  }

  ulohelySzamGeneralas(jegyFoglaltDarab:number):number[]{
    let ulohelyek:number[] = [];
    let hely = 1;
    while(ulohelyek.length!=jegyFoglaltDarab){
      
      ulohelyek.push(hely);
      hely++;
    }
    return ulohelyek;
  }

  ulohelyHozzaadas(index:number){

    let hely = 1;
    while(this.jegyAdatLista[index].ulohely.length!=this.jegyAdatLista[index].jegyDarabszam){
      if (!this.jegyAdatLista[index].ulohely.includes(hely)){ // idejönne majd a check hogy melyik hely nincs foglalva if (hely!="foglalt")
        this.jegyAdatLista[index].ulohely.push(hely);
      }
      hely++;
    }
  }
}
