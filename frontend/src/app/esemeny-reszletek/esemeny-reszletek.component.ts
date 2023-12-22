import {Component, ElementRef, QueryList, Renderer2, ViewChildren} from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { ActivatedRoute } from '@angular/router';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-esemeny-reszletek',
  templateUrl: './esemeny-reszletek.component.html',
  styleUrls: ['./esemeny-reszletek.component.css']
})
export class EsemenyReszletekComponent{
  @ViewChildren('path') szektorok!: QueryList<ElementRef>;

  kivalasztottEsemeny:any;
  kivalasztottHelyszin:any;
  kivalasztottEloado:any;
  helyszinSvg: SafeHtml ='';

  constructor(private route: ActivatedRoute,
              public esemenySzerviz:EsemenyService,
              public helyszinSzerviz:HelyszinService,
              private renderer: Renderer2,
              private sanitizer: DomSanitizer) {
  }

  jegyadatLista: JegyAdatModell[] = [];
  
  ngOnInit():void{
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.esemenySzerviz.esemenyAdatok(id).subscribe((valasz)=>{
      this.kivalasztottEsemeny=valasz;
      console.log(this.kivalasztottEsemeny)
      this.kivalasztottHelyszin = this.kivalasztottEsemeny.helyszin;
      this.kivalasztottEloado = this.kivalasztottEsemeny.eloado;
      this.helyszinSvgBetoltes();
    });


  }

  szektorSzinezes(){
    const element = document.getElementById('l01_vip_bal');

    element!.style.fill = 'red';
  }

  helyszinSvgBetoltes(){
   this.helyszinSzerviz.helyszinSvgKepUrl(this.kivalasztottHelyszin.svg_kep_eleres).subscribe((valasz)=>{
      this.helyszinSvg =  this.sanitizer.bypassSecurityTrustHtml(valasz);
      console.log(this.helyszinSvg)
    });
  }

}