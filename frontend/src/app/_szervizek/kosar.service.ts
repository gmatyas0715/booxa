import { Injectable } from '@angular/core';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';

@Injectable({
  providedIn: 'root'
})
export class KosarService {

  jegyAdatLista: JegyAdatModell[] = [];

  kosarbaHelyezes(item:JegyAdatModell){
    this.jegyAdatLista.push(item);
  }

  tetelTorles(){
    this.jegyAdatLista.splice(0,1);
  }
}
