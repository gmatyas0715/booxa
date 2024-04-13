import { Component, OnInit } from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { EsemenyModell } from '../_modellek/esemeny-modell';
import { EloadoService } from '../_szervizek/eloado.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { MufajService } from '../_szervizek/mufaj.service';
import { CimService } from '../_szervizek/cim.service';
import { KosarService } from '../_szervizek/kosar.service';
import { DatePipe } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy } from 'lodash';
import { isEmpty } from 'lodash';
import { HelyszinModell } from '../_modellek/helyszin-modell';
import { EloadoModell } from '../_modellek/eloado-modell';

@Component({
  selector: 'app-esemeny-kereso',
  templateUrl: './esemeny-kereso.component.html',
  styleUrls: ['./esemeny-kereso.component.css']
})
export class EsemenyKeresoComponent implements OnInit{

  maiDatum: Date = new Date();
  public esemenyDatum:string = ""; 
  public minJegyar:number;
  public maxJegyar:number;
  public mufajLista: string[] = [];
  public telepulesLista: string[] = [];
  public eloadoJavaslatok: string[] = [];
  public helyszinJavaslatok: string[] = [];
  public eloadoHelyszinJavaslatok: string[] = [];
  public esemenyLista:EsemenyModell[] = [];
  public megjelenitettEsemenyekTomb:EsemenyModell[] = []
  public keresettEloado:string = "";
  public keresettHelyszin:string = "";
  public keresettMufajok:string[] = [];
  public keresettTelepulesek: string[] = [];
  public talalatRendezesOpcio:string = "datum_n";
  public cols:number = 2;
  public esemenyekDbOldalon = 10;
  public oldalSzam = 0;
  public szuroMenu = false;
  public konkretKereses = true;
  private MIN_JEGYAR: number = 0;
  private MAX_JEGYAR: number = 30000;


  customBreakpoints = {
    xs: '(min-width: 0px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 2200px)'
  };
  
  constructor(public esemenySzerviz:EsemenyService,
              public eloadoSzerviz:EloadoService,
              public helyszinSzerviz:HelyszinService,
              public mufajSzerviz: MufajService,
              public cimSzerviz:CimService,
              public kosarSzerviz:KosarService,
              private datePipe:DatePipe,
              private breakpointObserver: BreakpointObserver,
              private route:ActivatedRoute,
              private router: Router) {
                this.paramLekerdezes()
    this.minJegyar = this.MIN_JEGYAR;
    this.maxJegyar = this.MAX_JEGYAR;
    this.breakpointObserver.observe([
      this.customBreakpoints.xs,
      this.customBreakpoints.sm,
      this.customBreakpoints.md,
      this.customBreakpoints.lg,
      this.customBreakpoints.xl,
      this.customBreakpoints.xxl
    ]).subscribe(result => {
      if (result.breakpoints[this.customBreakpoints.xxl]) {
        this.cols = 3;
      } else if (result.breakpoints[this.customBreakpoints.xl]) {
        this.cols = 2;
      } else if (result.breakpoints[this.customBreakpoints.lg]) {
        this.cols = 1;
      } else if (result.breakpoints[this.customBreakpoints.md]) {
        this.cols = 1;
      } else if (result.breakpoints[this.customBreakpoints.sm]) {
        this.cols = 1;
      } else if (result.breakpoints[this.customBreakpoints.xs]) {
        this.cols = 1;

      }
    });
    this.mufajBetoltes();
    this.eloadoJavaslatBetoltes();
    this.helyszinJavaslatBetoltes();
    this.helyszinCimBetoltes();
    this.esemenyKereses();
  }

  szuroMuvelet(){
    this.szuroMenu = !this.szuroMenu
  }

  ngOnInit(): void {
   
  }

  paramLekerdezes(){
    this.route.queryParams.subscribe(params=>{
      this.keresettEloado = params['eloado'] || ''
      this.keresettHelyszin = params['helyszin'] || ''

      if (params['mufajok']){
        this.keresettMufajok = params['mufajok']?params['mufajok'].split(','):[]
      }

      if (params['telepulesek']){
        this.keresettTelepulesek = params['telepulesek']?params['telepulesek'].split(','):[]
      }
      this.esemenyDatum = params['idopont'] || ''

      if (params['ar_kozott']){
        let queryMinJegyar:number = parseInt(params['ar_kozott'].split('-')[0])
        let queryMaxJegyar:number = parseInt(params['ar_kozott'].split('-')[1])
  
        if (queryMinJegyar<=this.MAX_JEGYAR && queryMinJegyar>=this.MIN_JEGYAR){
          this.minJegyar = queryMinJegyar
        }
        else{
          this.minJegyar=this.MIN_JEGYAR
          if (queryMaxJegyar<this.MIN_JEGYAR || queryMaxJegyar>this.MAX_JEGYAR){
            this.maxJegyar=this.MAX_JEGYAR
          }
          this.parameterAktualizalas()
        }
  
        if (queryMaxJegyar<this.minJegyar|| queryMaxJegyar>this.MAX_JEGYAR){
          this.maxJegyar=this.MAX_JEGYAR
          this.parameterAktualizalas()
        }
        else {
          this.maxJegyar = queryMaxJegyar
        }
      }
    })
  }

  esemenyKivalasztas(event: any) {
    this.esemenyDatum = this.datePipe.transform(event.target.value, 'yyyy-MM-dd') as string || "";
    this.esemenyKereses()
  }

  parameterAktualizalas(){
    const queryParams = {
      eloado: this.keresettEloado,
      helyszin: this.keresettHelyszin,
      mufajok:this.keresettMufajok.toString(),
      telepulesek:this.keresettTelepulesek.toString(),
      idopont: this.esemenyDatum.toString(),
      ar_kozott:this.minJegyar+'-'+this.maxJegyar
    }

    let queryParamObj: {[key:string]:string} = {};
    let urlParams = new URLSearchParams(omitBy(queryParams,isEmpty))

    urlParams.forEach((value,key)=>{
      queryParamObj[key] = value;
    });
    this.router.navigate(['/esemeny-kereso'],{queryParams: queryParamObj})
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
        this.esemenyLista.sort((a,b)=>new Date(a.idopont.toString()).getTime()-new Date(b.idopont.toString()).getTime());
        break;
      case 'datum_cs':
        this.esemenyLista.sort((a,b)=>new Date(b.idopont.toString()).getTime()-new Date(a.idopont.toString()).getTime());
        break;
    }
    this.elsoOldal()
  }

  jegyArHatarertekValtozas(){
    if (this.maxJegyar<this.minJegyar)this.maxJegyar=this.minJegyar;
    this.esemenyLista.sort()
  }

  helyszinCimBetoltes(){
    if (this.cimSzerviz.telepulesLista.length==0){
      this.cimSzerviz.helyszinCimekLekerdezese().subscribe((valasz:string[])=>{
        this.cimSzerviz.telepulesLista = valasz.sort((a,b)=>a.localeCompare(b)); 
        this.telepulesLista = this.cimSzerviz.telepulesLista
      });
    }

    else{
      this.telepulesLista = this.cimSzerviz.telepulesLista
    }
  }

  mufajBetoltes(){
    if (this.mufajSzerviz.mufajLista.length==0){
      this.mufajSzerviz.mufajokLekerdezese().subscribe((valasz:string[])=>{
        this.mufajSzerviz.mufajLista = valasz.sort((a,b)=>a.localeCompare(b)); 
        this.mufajLista = this.mufajSzerviz.mufajLista
      });
    }

    else{
      this.mufajLista = this.mufajSzerviz.mufajLista
    }
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

  checkValtozas(tipus:string,ertek:string){
    if(tipus==='mufaj'){
      if (this.keresettMufajok.includes(ertek)){
        this.keresettMufajok.splice(this.keresettMufajok.indexOf(ertek),1);
      }
      else{
        this.keresettMufajok.push(ertek);
      }
    }
    
    else{
      if (this.keresettTelepulesek.includes(ertek)){
        this.keresettTelepulesek.splice(this.keresettTelepulesek.indexOf(ertek),1);
      }
      else{
        this.keresettTelepulesek.push(ertek);
      }
    }
    this.esemenyKereses()
  }

  get eloadoFilterezett(): string[] {
    return this.filterezo(this.eloadoJavaslatok, this.keresettEloado);
  }

  get helyszinFilterezett(): string[] {
    return this.filterezo(this.helyszinJavaslatok, this.keresettHelyszin);
  }

  megjelenitettEsemenyekValtozas(){
    this.megjelenitettEsemenyekTomb = this.esemenyLista.slice(this.oldalSzam*this.esemenyekDbOldalon, this.oldalSzam*this.esemenyekDbOldalon+this.esemenyekDbOldalon)
  }

  private filterezo(javaslatok: string[], inputText: string): string[] {
    const filterErtek = inputText.toLowerCase();
    return javaslatok.filter(javaslat => javaslat.toLowerCase().includes(filterErtek));
  }

  esemenyKereses(){
    this.parameterAktualizalas()
    this.esemenyLista = []
    this.esemenySzerviz.esemenyKereses(this.keresettEloado,this.keresettHelyszin,this.esemenyDatum,this.keresettTelepulesek.toString(),this.keresettMufajok.toString(),this.minJegyar,this.maxJegyar)
      .subscribe({
        next: (valasz) => {
          if(this.esemenyLista.length==0){
          valasz.forEach((esemeny)=>{
            this.esemenyLista.push(
              new EsemenyModell(
                  esemeny.id,
                  esemeny.idopont,
                  esemeny.jegy_alapar,
                  new HelyszinModell(
                    0,
                    esemeny.helyszin_nev,
                    0,
                    esemeny.helyszin_kep_eleres,
                    "",
                    []
                ),
                  new EloadoModell(
                    0,
                    esemeny.eloado_nev,
                    "",
                    esemeny.kep_eleres
                )
              )
            )
          })
        }
        this.talalatRendezes()
        this.elsoOldal()
        },
        error: (error) =>{console.error('Hiba az eseménylekérdezésben!', error)}
      });
  }

  datumTorles(){
    this.esemenyDatum = "";
    this.esemenyKereses()
  }

  datumFormazas(datum:Date):string{
    let datumUj: Date = new Date(datum.toString())
    return datum+" "+
    datumUj.toLocaleDateString('hu-HU',{weekday:'long'}).charAt(0).toUpperCase()+datumUj.toLocaleDateString('hu-HU',{weekday:'long'}).slice(1)
  }

  szuroTorles(tipus:string){
    if (tipus=="varos"){
      this.keresettTelepulesek = [];
    }
    else{
      this.keresettMufajok = [];
    }
    this.oldalSzam = 0
    this.esemenyKereses()
  }

  elsoOldal(){
    this.oldalSzam = 0
    this.megjelenitettEsemenyekValtozas()
  }

  utolsoOldal(){
    this.oldalSzam = this.esemenyLista.length%this.esemenyekDbOldalon==0?this.esemenyLista.length/this.esemenyekDbOldalon:Math.floor(this.esemenyLista.length/this.esemenyekDbOldalon)
    this.megjelenitettEsemenyekValtozas()
  }

  lapozasElore(){
    if (this.esemenyLista.length-(this.oldalSzam+1)*this.esemenyekDbOldalon>0){
      this.oldalSzam+=1
      this.megjelenitettEsemenyekValtozas()
    }
  }

  lapozasHatra(){
    if (this.oldalSzam>0){
      this.oldalSzam-=1
      this.megjelenitettEsemenyekValtozas()
    }
  }

  konkretKeresesAlaphelyzet(opcio:string){
    opcio=='eloado'?this.keresettEloado = "":this.keresettHelyszin = ""
    this.esemenyKereses()
  }

  jegyArAlaphelyzet(){
    this.minJegyar = this.MIN_JEGYAR
    this.maxJegyar = this.MAX_JEGYAR
    this.esemenyKereses()
  }

  trackByFn(index: number, esemeny:any):any {
    return esemeny.id;
  }
}