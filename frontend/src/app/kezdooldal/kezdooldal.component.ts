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
      this.eloadoSzerviz.random10Eloado().subscribe((valasz)=>{
        this.eloadok = valasz
        console.log(valasz);
        
      })
    }

}
