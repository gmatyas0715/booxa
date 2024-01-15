import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { ActivatedRoute } from '@angular/router';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SzektorService } from '../_szervizek/szektor.service';
import { SzektorModell } from '../_modellek/szektor-modell';
import { SzektorAlegysegModell } from '../_modellek/szektor-alegyseg-modell';
import { KosarService } from '../_szervizek/kosar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SzektorAlegysegService } from '../_szervizek/szektor-alegyseg.service';

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
  kivalasztottSzektorok:any;
  kivalasztottSzektor:any;
  kivalasztottSzektorAlegyseg:any;
  kivalasztottUlohelyek:number[] = [];
  szektorFoglaltsagok:Map<string,[boolean,number]> = new Map<string,[boolean,number]>;
  jegyFoglaltDarab:number = 0
  helyszinSvg: SafeHtml ='';
  jegyKivalasztas_e:boolean = true;
  esemenyId:string;

  constructor(private route: ActivatedRoute,
              public esemenySzerviz:EsemenyService,
              public helyszinSzerviz:HelyszinService,
              public szektorSzerviz:SzektorService,
              public szektorAlegysegSzerviz:SzektorAlegysegService,
              private kosarService:KosarService,
              private sanitizer: DomSanitizer,
              private _snackBar: MatSnackBar) {

                this.esemenyId = this.route.snapshot.paramMap.get('id') as string;
                this.szektorFoglaltsag(this.esemenyId);
                this.esemenySzerviz.esemenyAdatok(this.esemenyId).subscribe((valasz)=>{
                  this.kivalasztottEsemeny=valasz;
                  this.kivalasztottHelyszin = this.kivalasztottEsemeny.helyszin;
                  this.kivalasztottEloado = this.kivalasztottEsemeny.eloado;
                  this.helyszinSvgBetoltes();
                });
                this.szektorSzerviz.szektorok(this.esemenyId).subscribe((valasz)=>{
                  this.kivalasztottSzektorok = valasz;
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

  jegyKivalasztas(szektor:SzektorModell,szektorAlegyseg:SzektorAlegysegModell){
    this.kivalasztottSzektorAlegyseg = szektorAlegyseg;
    this.kivalasztottSzektor = szektor;
    this.jegyKivalasztas_e = false;
  }

  jegyKosarbaHelyezes(){
    this.kosarService.kosarbaHelyezes(new JegyAdatModell(
      this.kivalasztottEsemeny,
      this.kivalasztottSzektor,
      this.kivalasztottSzektorAlegyseg,
      this.kosarService.ulohelySzamGeneralas(this.jegyFoglaltDarab),
      this.jegyFoglaltDarab
    ));
    this.jegyInfoVisszaallitas();
    this.openSnackbar()
  }

  jegyInfoVisszaallitas(){
    this.jegyKivalasztas_e = true;
    this.jegyFoglaltDarab = 0;
  }

  szektorFoglaltsag(esemenyId:string){
    this.szektorAlegysegSzerviz.szektorAlegysegFoglaltsag(esemenyId).subscribe((valasz)=>{
      this.szektorFoglaltsagok = valasz;
      console.log(this.szektorFoglaltsagok)
    });
  }

  openSnackbar(){
    this._snackBar.open("Jegy kosárba helyezve!",'Mégse',{duration:2500}).onAction().subscribe(()=>{this.kosarService.jegyAdatLista.pop();});
  }
}