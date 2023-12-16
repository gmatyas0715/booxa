import {Component} from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { ActivatedRoute } from '@angular/router';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';

@Component({
  selector: 'app-esemeny-reszletek',
  templateUrl: './esemeny-reszletek.component.html',
  styleUrls: ['./esemeny-reszletek.component.css']
})
export class EsemenyReszletekComponent{

  kivalasztottEsemeny:any;
  kivalasztottHelyszin:any;
  kivalasztottEloado:any;

  constructor(private route: ActivatedRoute,
              public esemenySzerviz:EsemenyService,
              public helyszinSzerviz:HelyszinService) {
  }

  jegyadatLista: JegyAdatModell[] = [];
  
  ngOnInit():void{
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.esemenySzerviz.esemenyAdatok(id).subscribe((valasz)=>{
      this.kivalasztottEsemeny=valasz;
      console.log(this.kivalasztottEsemeny)
      this.kivalasztottHelyszin = this.kivalasztottEsemeny.helyszin;
      this.kivalasztottEloado = this.kivalasztottEsemeny.eloado;
    });
  }

}