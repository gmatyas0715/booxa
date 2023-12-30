import { Component } from '@angular/core';
import { KosarService } from '../_szervizek/kosar.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { EloadoService } from '../_szervizek/eloado.service';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';

@Component({
  selector: 'app-kosar-osszegzo',
  templateUrl: './kosar-osszegzo.component.html',
  styleUrls: ['./kosar-osszegzo.component.css'],
})
export class KosarOsszegzoComponent {

  kosarElemek: JegyAdatModell[];

  constructor(public kosarService:KosarService,
              public helyszinService:HelyszinService,
              public eloadoService:EloadoService) {
    this.kosarElemek = this.kosarService.jegyAdatLista
  }
}
