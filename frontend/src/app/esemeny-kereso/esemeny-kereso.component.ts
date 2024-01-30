import { Component } from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { EsemenyModell } from '../_modellek/esemeny-modell';
import { EloadoService } from '../_szervizek/eloado.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { MufajService } from '../_szervizek/mufaj.service';
import { CimService } from '../_szervizek/cim.service';
import { KosarService } from '../_szervizek/kosar.service';
import { DatePipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-esemeny-kereso',
  templateUrl: './esemeny-kereso.component.html',
  styleUrls: ['./esemeny-kereso.component.css']
})
export class EsemenyKeresoComponent {

  public minJegyar:number = 3000;
  public maxJegyar:number = 50000;
  public mufajLista: string[] = [];
  public telepulesLista: string[] = [];
  public eloadoJavaslatok: string[] = [];
  public helyszinJavaslatok: string[] = [];
  public esemenyLista:EsemenyModell[] = [];
  public keresettEloado:string = "";
  public keresettHelyszin:string = "";
  public talalatRendezesOpcio:string = "datum_n";
  public cols:number = 2;
  
  constructor(public esemenySzerviz:EsemenyService,
              public eloadoSzerviz:EloadoService,
              public helyszinSzerviz:HelyszinService,
              public mufajSzerviz: MufajService,
              public cimSzerviz:CimService,
              public kosarSzerviz:KosarService,
              private datePipe:DatePipe,
              private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.cols = 1;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.cols = 2;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.cols = 3;
      } else if (result.breakpoints[Breakpoints.Large]) {
        this.cols = 3;
      } else if (result.breakpoints[Breakpoints.XLarge]) {
        this.cols = 3;
      }
    });
    this.mufajBetoltes();
    this.eloadoJavaslatBetoltes();
    this.helyszinJavaslatBetoltes();
    this.helyszinCimBetoltes();
  }
  
  talalatRendezes(){
    switch (this.talalatRendezesOpcio){
      case 'eloado_AZ':
        this.esemenyLista.sort((a,b)=>a.eloado.nev.localeCompare(b.eloado.nev));
        break;
      case 'eloado_ZA':
        this.esemenyLista.sort((a,b)=>b.eloado.nev.localeCompare(a.eloado.nev));
        break;
      case 'helyszin_AZ':
        this.esemenyLista.sort((a,b)=>a.helyszin.nev.localeCompare(b.helyszin.nev));
        break;
      case 'helyszin_ZA':
        this.esemenyLista.sort((a,b)=>b.helyszin.nev.localeCompare(a.helyszin.nev));
        break;
      case 'jegy_n':
        this.esemenyLista.sort((a,b)=>a.jegy_alapar-b.jegy_alapar);
        break;
      case 'jegy_cs':
        this.esemenyLista.sort((a,b)=>b.jegy_alapar-a.jegy_alapar);
        break;
      case 'datum_n':
        this.esemenyLista.sort((a,b)=>a.idopont.getTime()-b.idopont.getTime());
        break;
      case 'datum_cs':
        this.esemenyLista.sort((a,b)=>b.idopont.getTime()-a.idopont.getTime());
        break;
    }
  }

  jegyArHatarertekValtozas(){
    if (this.maxJegyar<this.minJegyar)this.maxJegyar=this.minJegyar;
    this.esemenyLista.sort()
  }

  helyszinCimBetoltes(){
    this.cimSzerviz.helyszinCimekLekerdezese().subscribe((valasz)=>{
      this.telepulesLista = valasz; 
    });
  }

  mufajBetoltes(){
    this.mufajSzerviz.mufajokLekerdezese().subscribe((valasz)=>{
      this.mufajLista = valasz; 
    });
  }

  eloadoJavaslatBetoltes(){
    this.eloadoSzerviz.eloadokNevekLekerdezese().subscribe((valasz)=>{
      this.eloadoJavaslatok = valasz;   
    });
  }

  helyszinJavaslatBetoltes(){
    this.helyszinSzerviz.helyszinNevekLekerdezese().subscribe((valasz)=>{
      this.helyszinJavaslatok = valasz;
    });
  }

  get eloadoFilterezett(): string[] {
    return this.filterezo(this.eloadoJavaslatok, this.keresettEloado);
  }

  get helyszinFilterezett(): string[] {
    return this.filterezo(this.helyszinJavaslatok, this.keresettHelyszin);
  }

  private filterezo(javaslatok: string[], inputText: string): string[] {
    const filterErtek = inputText.toLowerCase();
    return javaslatok.filter(javaslat => javaslat.toLowerCase().includes(filterErtek));
  }

  esemenyKereses(){
    this.esemenySzerviz.eloadoAdatok(this.keresettEloado,this.keresettHelyszin)
      .subscribe({
        next: (valasz) => {this.esemenyLista = valasz},
        error: (error) =>{console.error('Hiba az eseménylekérdezésben!', error)}
      });
  }

  ferohelyek:string[] = 
  [
    "<2000",
    "2001-4000",
    "4001-10000",
    "10001-15000",
    "15000<"
  ];

  mostDatum:Date = new Date();

  ev:number = this.mostDatum.getFullYear();
  honap:string = String(this.mostDatum.getMonth() + 1).padStart(2, '0');
  nap:string = String(this.mostDatum.getDate()).padStart(2, '0');

  maiDatum = `${this.ev}-${this.honap}-${this.nap}`;
  esemenyDatum:string = "";

  datumTorles(){
    this.esemenyDatum = "";
  }

  datumFormazas(datum:Date):string{
    return this.datePipe.transform(datum,'yyyy/MM/dd HH:mm')!+', '+
    datum.toLocaleDateString('hu-HU',{weekday:'long'}).charAt(0).toUpperCase()+datum.toLocaleDateString('hu-HU',{weekday:'long'}).slice(1)
  }
}
