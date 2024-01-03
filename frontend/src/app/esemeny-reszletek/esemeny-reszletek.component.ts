import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { ActivatedRoute } from '@angular/router';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SzektorCsoportService } from '../_szervizek/szektor-csoport.service';
import { SzektorCsoportModell } from '../_modellek/szektor-csoport-modell';
import { SzektorModell } from '../_modellek/szektor-modell';
import { KosarService } from '../_szervizek/kosar.service';

@Component({
  selector: 'app-esemeny-reszletek',
  templateUrl: './esemeny-reszletek.component.html',
  styleUrls: ['./esemeny-reszletek.component.css'],
})
export class EsemenyReszletekComponent{
  @ViewChildren('path') szektorok!: QueryList<ElementRef>;

  kivalasztottEsemeny:any;
  kivalasztottHelyszin:any;
  kivalasztottEloado:any;
  kivalasztottSzektorCsoportok:any;
  kivalasztottSzektorCsoport:any;
  kivalasztottSzektor:any;
  kivalasztottUlohelyek:number[] = []
  jegyFoglaltDarab:number=0
  helyszinSvg: SafeHtml ='';
  jegyKivalasztas_e:boolean = true;

  constructor(private route: ActivatedRoute,
              public esemenySzerviz:EsemenyService,
              public helyszinSzerviz:HelyszinService,
              public szektorCsoportSzerviz:SzektorCsoportService,
              private kosarService:KosarService,
              private sanitizer: DomSanitizer) {
  }
  
  ngOnInit():void{
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.esemenySzerviz.esemenyAdatok(id).subscribe((valasz)=>{
      this.kivalasztottEsemeny=valasz;
      this.kivalasztottHelyszin = this.kivalasztottEsemeny.helyszin;
      this.kivalasztottEloado = this.kivalasztottEsemeny.eloado;
      this.helyszinSvgBetoltes();
    });
    this.szektorCsoportSzerviz.szektorCsoportok(id).subscribe((valasz)=>{
      this.kivalasztottSzektorCsoportok = valasz;
    })

  }

  szektorSzinezes(){
    const element = document.getElementById('l01_vip_bal');

    element!.style.fill = 'red';
  }

  helyszinSvgBetoltes(){
   this.helyszinSzerviz.helyszinSvgKepUrl(this.kivalasztottHelyszin.svg_kep_eleres).subscribe((valasz)=>{
      this.helyszinSvg =  this.sanitizer.bypassSecurityTrustHtml(valasz);
    });
  }

  jegyKivalasztas(szektorCsoport:SzektorCsoportModell,szektor:SzektorModell){
    this.kivalasztottSzektor = szektor;
    this.kivalasztottSzektorCsoport = szektorCsoport;
    this.jegyKivalasztas_e = false;
  }

  jegyKosarbaHelyezes(){

    console.log(this.kivalasztottSzektor,this.kivalasztottSzektorCsoport)

    this.kosarService.kosarbaHelyezes(new JegyAdatModell(
      this.kivalasztottEsemeny,
      this.kivalasztottSzektorCsoport,
      this.kivalasztottSzektor,
      [1],
      this.jegyFoglaltDarab
    ));

    console.log(this.kosarService.jegyAdatLista[0])

    this.jegyInfoVisszaallitas();
  }

  jegyInfoVisszaallitas(){
    this.jegyKivalasztas_e = true;
    this.jegyFoglaltDarab = 0;
  }
}