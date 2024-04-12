import { Component } from '@angular/core';
import { KosarService } from '../_szervizek/kosar.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { EloadoService } from '../_szervizek/eloado.service';

@Component({
  selector: 'app-kosar',
  templateUrl: './kosar.component.html',
  styleUrls: ['./kosar.component.css'],
})
export class KosarComponent {

  constructor(public kosarSzerviz:KosarService,
              public helyszinService:HelyszinService,
              public eloadoService:EloadoService) {
  }

  trackById(index: number, kosarElem: any): number {
    return kosarElem.id;
  }
}
