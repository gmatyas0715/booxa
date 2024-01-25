import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { ActivatedRoute } from '@angular/router';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';
import { SzektorService } from '../_szervizek/szektor.service';
import { SzektorModell } from '../_modellek/szektor-modell';
import { SzektorAlegysegModell } from '../_modellek/szektor-alegyseg-modell';
import { KosarService } from '../_szervizek/kosar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SzektorAlegysegService } from '../_szervizek/szektor-alegyseg.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-esemeny-reszletek',
  templateUrl: './esemeny-reszletek.component.html',
  styleUrls: ['./esemeny-reszletek.component.css'],
})
export class EsemenyReszletekComponent{
  @ViewChild('svgContainer') svgContainer!: ElementRef;

  jegyFoglalhatoDarabok:number[] = [1,2,3,4,5]
  kivalasztottEsemeny:any;
  kivalasztottHelyszin:any;
  kivalasztottEloado:any;
  kivalasztottHelyszinNev:string = "";
  kivalasztottEloadoNev:string = "";
  kivalasztottEsemenyDatum:string = "";
  kivalasztottSzektorok:SzektorModell[] = [];
  osszesSzektor:SzektorModell[] = [];
  kivalasztottSzektor:any;
  kivalasztottSzektorAlegyseg:any;
  kivalasztottUlohelyek:number[] = [];
  szektorFoglaltsagok:Map<string,[boolean,number]> = new Map<string,[boolean,number]>;
  jegyFoglaltDarab:number = 0
  helyszinSvg: string ='';
  jegyKivalasztas_e:boolean = true;
  esemenyId:string;

  constructor(private route: ActivatedRoute,
              public esemenySzerviz:EsemenyService,
              public helyszinSzerviz:HelyszinService,
              public szektorSzerviz:SzektorService,
              public szektorAlegysegSzerviz:SzektorAlegysegService,
              private kosarService:KosarService,
              private _snackBar: MatSnackBar,
              private renderer: Renderer2,
              private datePipe:DatePipe) {
                this.esemenyId = this.route.snapshot.paramMap.get('id') as string;
                this.esemenySzerviz.esemenyAdatok(this.esemenyId).subscribe((valasz)=>{
                  this.kivalasztottEsemeny=valasz;
                  this.kivalasztottEsemenyDatum = this.datumFormazas(this.kivalasztottEsemeny.idopont);
                  this.kivalasztottHelyszin = this.kivalasztottEsemeny.helyszin;
                  this.kivalasztottEloado = this.kivalasztottEsemeny.eloado;
                  this.kivalasztottHelyszinNev = this.kivalasztottHelyszin.nev;
                  this.kivalasztottEloadoNev = this.kivalasztottEloado.nev;
                  this.helyszinSvgBetoltes();
                });
                this.szektorFoglaltsag(this.esemenyId);
                this.szektorSzerviz.szektorok(this.esemenyId).subscribe((valasz)=>{
                  this.kivalasztottSzektorok = [...valasz]
                  this.osszesSzektor = [...valasz]
                });
  }

  szektorSzinezes(group:string,opacity:number){
    const svg = document.querySelector("svg");
    const element = svg!.getElementById(group);
    const childElements = element.children;

    for (let i = 0; i < childElements.length; i++) {
      const child = childElements[i];
      this.renderer.setStyle(child, 'opacity',opacity);
    }
  }
    
  szektorKijelolesTorles(){
    
    const mainGroup = document.querySelector("g");
    const groups = mainGroup!.querySelectorAll("g");
    groups.forEach(group => {
      const childElements = group.children;
      for (let i = 0; i < childElements.length; i++) {
        const child = childElements[i];
        this.renderer.setStyle(child, 'opacity',0.3);
      }
      
    });
    this.kivalasztottSzektorok = []
  }
  
  osszesSzektorKijeloles(){
    const mainGroup = document.querySelector("g");
    const groups = mainGroup!.querySelectorAll("g");
    groups.forEach(group => {
      const childElements = group.children;
      for (let i = 0; i < childElements.length; i++) {
        const child = childElements[i];
        this.renderer.setStyle(child, 'opacity',1);
      }
    });
    this.kivalasztottSzektorok = [...this.osszesSzektor]
    this.kivalasztottSzektorok.sort((a,b)=>a.id.localeCompare(b.id));
  }

  clickEvent(group:string){
    let szektorListaban:boolean = false;
    for (let szektor of this.kivalasztottSzektorok){
      if (szektor.id==group){
        szektorListaban = true;
        this.kivalasztottSzektorok.splice(this.kivalasztottSzektorok.indexOf(szektor),1);
        this.kivalasztottSzektorok.sort((a,b)=>a.id.localeCompare(b.id));
        this.szektorSzinezes(group,0.3);
        break;
      }
    }
      
    if (!szektorListaban){
      for (let szektor of this.osszesSzektor){
        if (szektor.id==group){
          this.kivalasztottSzektorok.push(szektor);
          this.kivalasztottSzektorok.sort((a,b)=>a.id.localeCompare(b.id));
          this.szektorSzinezes(group,1);
        }
      }
    }
  }

  helyszinSvgBetoltes(){

    this.helyszinSzerviz.helyszinSvgKepUrl(this.kivalasztottHelyszin.svg_kep_eleres).subscribe((valasz)=>{
        this.helyszinSvg =  valasz;
        this.renderer.setProperty(this.svgContainer.nativeElement, 'innerHTML', this.helyszinSvg);
        this.kivalasztottSzektorok.forEach(szektor => {
          const g:HTMLElement = this.svgContainer.nativeElement.querySelector('#'+szektor.id);
          this.renderer.listen(g, 'click', () => {
            this.clickEvent(g.id);
        });
      });
    }
  )}

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
    });
  }

  datumFormazas(datum:Date):string{
    return this.datePipe.transform(datum,'yyyy/MM/dd HH:mm')!+', '+
    datum.toLocaleDateString('hu-HU',{weekday:'long'}).charAt(0).toUpperCase()+datum.toLocaleDateString('hu-HU',{weekday:'long'}).slice(1)
  }

  openSnackbar(){
    this._snackBar.open("Jegy kosárba helyezve!",'Mégse',{duration:2500}).onAction().subscribe(()=>{this.kosarService.jegyAdatLista.pop();});
  }

  foglaltDarabBeallitas(jegyFoglalhatoDarab:number){
    this.jegyFoglaltDarab = jegyFoglalhatoDarab;
  }

  getSvgSzin(szektorAlegyseg:string):string{
    const szin = this.svgContainer.nativeElement.querySelector(szektorAlegyseg).style.fill;
    return szin ||'white';
  }
}