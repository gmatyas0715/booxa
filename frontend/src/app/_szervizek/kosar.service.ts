import { Injectable } from '@angular/core';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';

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

  kosarbaHelyezes(item:JegyAdatModell){
    this.jegyAdatLista.push(item);
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

  jegyDarabCsokkentes(index:number){
    if (this.jegyAdatLista[index].jegyDarabszam==1) return;
    this.jegyAdatLista[index].jegyDarabszam!--
    //this.getTetelOsszar(index);
  }

  jegyDarabNoveles(index:number){
    this.jegyAdatLista[index].jegyDarabszam!++
    //this.getTetelOsszar(index);
  }
}
