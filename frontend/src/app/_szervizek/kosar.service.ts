import { Injectable } from '@angular/core';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';
import { SzektorModell } from '../_modellek/szektor-modell';

@Injectable({
  providedIn: 'root'
})
export class KosarService {

  jegyAdatLista: JegyAdatModell[] = [];

  getKosarOsszar():number{
    let kosarOsszar:number = 0;
    this.jegyAdatLista.forEach(jegy=>{
      kosarOsszar+=this.getTetelOsszarByItem(jegy);
    });
    return kosarOsszar;
  }

  kosarbaHelyezes(jegyAdat:JegyAdatModell){
    this.jegyAdatLista.push(jegyAdat);
  }

  tetelTorles(index:number){
    this.jegyAdatLista.splice(index,1);
  }

  getTetelOsszarByItem(kosarElem:JegyAdatModell):number{
    return kosarElem.jegyDarabszam*kosarElem.szektor.szektor_jegyar;
  }
  
  getTetelOsszarByIndex(index:number):number{
    const kosarElem:JegyAdatModell = this.jegyAdatLista[index];
    return kosarElem.jegyDarabszam*kosarElem.szektor.szektor_jegyar;
  }

  jegyDarabCsokkentes(index:number,szektor:SzektorModell){
    if (this.jegyAdatLista[index].jegyDarabszam==1) return;
    this.jegyAdatLista[index].jegyDarabszam!--
    //this.getTetelOsszar(index);
  }

  jegyDarabNoveles(index:number,szektor:SzektorModell){
    this.jegyAdatLista[index].jegyDarabszam!++
    //this.getTetelOsszar(index);
  }
}
