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
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-esemeny-reszletek',
  templateUrl: './esemeny-reszletek.component.html',
  styleUrls: ['./esemeny-reszletek.component.css'],
})
export class EsemenyReszletekComponent{
  @ViewChild('svgContainer') svgContainer!: ElementRef;

  customBreakpoints = {
    xs: '(min-width: 0px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)'
  };

  MAX_JEGYEK = 5;
  jegyDarabOpciok:number[] = []
  esemeny:any;
  helyszin:any;
  eloado:any;
  helyszinNev:string = "";
  eloadoNev:string = "";
  esemenyDatum:string = "";
  kivalasztottSzektorAlegysegek:SzektorAlegysegModell[] = [];
  osszesSzektor:SzektorModell[] = [];
  kivalasztottSzektorok:SzektorModell[] = [];
  kivalasztottSzektor:any;
  kivalasztottSzektorAlegyseg:any;
  kivalasztottUlohelyek:number[] = [];
  szektorFoglaltsagok:Map<string,[boolean,number]> = new Map<string,[boolean,number]>();
  jegyFoglaltDarab:number = 0
  helyszinSvg: string ='';
  jegyKivalasztas_e:boolean = true;
  esemenyId:string;
  svgSzektorToltes:boolean = true;
  aktivRendezes = 'nev'
  rendezesSorrend = true

  constructor(private route: ActivatedRoute,
              public esemenySzerviz:EsemenyService,
              public helyszinSzerviz:HelyszinService,
              public szektorSzerviz:SzektorService,
              public szektorAlegysegSzerviz:SzektorAlegysegService,
              private kosarService:KosarService,
              private _snackBar: MatSnackBar,
              private renderer: Renderer2,
              private datePipe:DatePipe,
              private breakpointObserver: BreakpointObserver,) {
                this.esemenyId = this.route.snapshot.paramMap.get('id') as string;
                this.szektorFoglaltsag(this.esemenyId);
                this.esemenySzerviz.esemenyAdatok(this.esemenyId).subscribe((valasz)=>{
                  this.esemeny=valasz;
                  this.esemenyDatum = this.datumFormazas(this.esemeny.idopont);
                  this.helyszin = this.esemeny.helyszin;
                  this.eloado = this.esemeny.eloado;
                  this.helyszinNev = this.helyszin.nev;
                  this.eloadoNev = this.eloado.nev;
                  this.szektorSzerviz.szektorok(this.esemenyId).subscribe((valasz)=>{
                    
                    this.helyszinSvgBetoltes(valasz);
                  });
                });
              }


  hoverEvent(id: string) {
    const g:HTMLElement = this.svgContainer.nativeElement.querySelector('#'+id);
    g.setAttribute('filter', 'drop-shadow(0 0 5px crimson');
  }

  mouseLeaveEvent(id: string){
    const g:HTMLElement = this.svgContainer.nativeElement.querySelector('#'+id);    
    g.removeAttribute('filter');
  }

  jegyFoglalhatoDarabok(jegyMaradek:number){
    const maxJegyek = jegyMaradek<this.MAX_JEGYEK?jegyMaradek:this.MAX_JEGYEK
    const jegyDarab = [];

    for (let i = 1; i <= maxJegyek; i++) {
      jegyDarab.push(i)
    }
    this.jegyDarabOpciok = jegyDarab
  }
  
  setSvgSize(size:string) {
    const svg = document.querySelector("svg");
    svg?.setAttribute('width',size);
    svg?.setAttribute('height',size)
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
    this.szektorAlegysegekFrissites()
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
    this.szektorAlegysegekFrissites()
  }

  clickEvent(group:string){

    let szektorListaban:boolean = false;   
    
    for (let szektor of this.kivalasztottSzektorok){
      if (szektor.id==group){
        this.szektorSzinezes(group,0.3);
        szektorListaban = true;
        this.kivalasztottSzektorok.splice(this.kivalasztottSzektorok.indexOf(szektor),1)
        this.szektorAlegysegekFrissites()
        break
      }
    }
      
    if (!szektorListaban){
      for (let szektor of this.osszesSzektor){
        if (szektor.id==group){
        this.szektorSzinezes(group,1);
        this.kivalasztottSzektorok.push(szektor)
        this.szektorAlegysegekFrissites()
        break
        }
      }
    }    
  }

  helyszinSvgBetoltes(szektorAdatok:any){    
    this.helyszinSzerviz.helyszinSvgKepUrl(this.helyszin.svg_kep_eleres).subscribe((valasz)=>{
      this.helyszinSvg =  valasz;
      this.renderer.setProperty(this.svgContainer.nativeElement, 'innerHTML', this.helyszinSvg);
      this.breakpointObserver.observe([
        this.customBreakpoints.xs,
        this.customBreakpoints.sm,
        this.customBreakpoints.md,
        this.customBreakpoints.lg,
        this.customBreakpoints.xl,
      ]).subscribe(result => {
        if (result.breakpoints[this.customBreakpoints.xl]) {
          this.setSvgSize('140mm');
        } else if (result.breakpoints[this.customBreakpoints.lg]) {
          this.setSvgSize('140mm');
        } else if (result.breakpoints[this.customBreakpoints.md]) {
          this.setSvgSize('140mm');
        } else if (result.breakpoints[this.customBreakpoints.sm]) {
          this.setSvgSize('100mm');
        } else if (result.breakpoints[this.customBreakpoints.xs]) {
          this.setSvgSize('70mm');
        }
      });
      this.szektorListaBetoltes(szektorAdatok)  
      this.svgSzektorToltes = false
    }
  )}

  szektorAlegysegekFrissites(){
    this.kivalasztottSzektorAlegysegek = []
    this.kivalasztottSzektorok.forEach((szektor)=>this.kivalasztottSzektorAlegysegek.push(...szektor.szektor_alegyseg))
    this.jegyAdatRendezes(this.rendezesSorrend,this.aktivRendezes)
  }

  szektorListaBetoltes(szektorAdatok:any){
    
    this.osszesSzektor = [...szektorAdatok]
    const szektorFoglaltsagNevek = Array.from(this.szektorFoglaltsagok.keys());


    this.osszesSzektor.forEach((szektor:any) => {

      const g:HTMLElement = this.svgContainer.nativeElement.querySelector('#'+szektor.id);
      this.renderer.listen(g, 'click', () => {
        this.clickEvent(g.id);
      });

      szektor.szektor_alegyseg = szektor.szektor_alegyseg.filter((szektorAlegyseg:any)=>{
        if (szektorFoglaltsagNevek.includes(szektorAlegyseg.id)){
          if (!this.szektorFoglaltsagok.get(szektorAlegyseg.id)![0]){
            const alegyseg:HTMLElement = this.svgContainer.nativeElement.querySelector('.'+szektorAlegyseg.id);
            alegyseg.style.fill = 'rgb(220, 220, 220)'
            return false
          }

          else{
            szektorAlegyseg.szin = g.style.fill
            szektorAlegyseg.jegy_maradek = this.szektorFoglaltsagok.get(szektorAlegyseg.id)?.[1]!
            szektorAlegyseg.szektor_nev = szektor.szektor_nev
            return true
          }
        }
        else{
          szektorAlegyseg.szin = g.style.fill
          szektorAlegyseg.szektor_nev = szektor.szektor_nev
          return true
        }
      })
    })
    
    this.kivalasztottSzektorok = [...this.osszesSzektor]    
    this.szektorAlegysegekFrissites()
  }

  jegyAdatRendezes(sorrend:boolean,opcio:string){
    switch (opcio) {
      case 'ar':
        this.aktivRendezes = opcio;
        this.rendezesSorrend = sorrend;

        if (sorrend){
          this.kivalasztottSzektorAlegysegek.sort((a,b)=>a.szektor_alegyseg_jegyar - b.szektor_alegyseg_jegyar)
        }
    
        else{
          this.kivalasztottSzektorAlegysegek.sort((a,b)=>b.szektor_alegyseg_jegyar - a.szektor_alegyseg_jegyar)
        }
        break;
    
      case 'nev':
        this.aktivRendezes = opcio;
        this.rendezesSorrend = sorrend;

        if (sorrend){
          this.kivalasztottSzektorAlegysegek.sort((a,b)=>a.szektor_nev.localeCompare(b.szektor_nev))
        }
    
        else{
          this.kivalasztottSzektorAlegysegek.sort((a,b)=>b.szektor_nev.localeCompare(a.szektor_nev))
        }
        break;
    }
  }

  jegyKivalasztas(szektorAlegyseg:SzektorAlegysegModell){
    this.kivalasztottSzektorAlegyseg = szektorAlegyseg;
    this.jegyKivalasztas_e = false;
    for (const szektor of this.kivalasztottSzektorok) {
      if (szektor.id = szektorAlegyseg.szektor_id){
        this.kivalasztottSzektor = szektor
        break
      }
    }
    if (szektorAlegyseg.jegy_maradek){
      this.jegyFoglalhatoDarabok(szektorAlegyseg.jegy_maradek.length);
    }

    else {
      this.jegyFoglalhatoDarabok(5);
    }
  }

  jegyKosarbaHelyezes(){
    this.kosarService.kosarbaHelyezes(new JegyAdatModell(
      this.esemeny,
      this.kivalasztottSzektor,
      this.kivalasztottSzektorAlegyseg,
      this.kosarService.ulohelySzamGeneralas(this.jegyFoglaltDarab,this.kivalasztottSzektorAlegyseg),
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
    this.szektorAlegysegSzerviz.szektorAlegysegFoglaltsag(esemenyId).subscribe((valasz:Map<string,[boolean,number]>)=>{
      console.log(valasz);
      
      Object.entries(valasz).forEach(([k, [b, n]]) => {
        this.szektorFoglaltsagok.set(k,[b, n])
      })
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
}