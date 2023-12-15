import {Component} from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { EsemenyModell } from '../_modellek/esemeny-modell';
import { HelyszinModell } from '../_modellek/helyszin-modell';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { EloadoModell } from '../_modellek/eloado-modell';

@Component({
  selector: 'app-esemeny-reszletek',
  templateUrl: './esemeny-reszletek.component.html',
  styleUrls: ['./esemeny-reszletek.component.css']
})
export class EsemenyReszletekComponent{

  constructor(public esemenySzerviz:EsemenyService,
              public helyszinSzerviz:HelyszinService) {

  }

  kivalasztottEsemeny:EsemenyModell = this.esemenySzerviz.kivalasztottEsemeny
  kivalasztottHelyszin:HelyszinModell = this.kivalasztottEsemeny.helyszin
  kivalasztottEloado:EloadoModell = this.kivalasztottEsemeny.eloado
  public id:string = "";

  Kattintas(event:Event):void{
      const element = event.target as HTMLElement;
      const elementId = element.id;
      console.log(elementId)
  }

  FillValtoztatas(event:Event){
    const element = event.target as SVGAElement;
    element.style.fill = 'blue';
  }

  FillVisszavaltoztatas(event:Event){
    const element = event.target as SVGAElement;
    element.style.fill = 'white';
  }
}