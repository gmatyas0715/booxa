import { Component } from '@angular/core';
import { EloadoService } from '../_szervizek/eloado.service';

@Component({
  selector: 'app-kezdooldal',
  templateUrl: './kezdooldal.component.html',
  styleUrls: ['./kezdooldal.component.css']
})
export class KezdooldalComponent {

  eloadok:any[] = []
  constructor(public eloadoSzerviz: EloadoService) {
    if (this.eloadoSzerviz.tizesLista.length==0){
      this.tizesListaBetoltes()
    }else{
      this.eloadok = this.eloadoSzerviz.tizesLista
    }
  }

  tizesListaBetoltes(){
    this.eloadoSzerviz.random10Eloado().subscribe((valasz)=>{
      this.eloadoSzerviz.tizesLista = valasz
      this.eloadok = valasz
    })
  }
}
