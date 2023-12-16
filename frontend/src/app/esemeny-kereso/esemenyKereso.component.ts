import { Component } from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { EsemenyModell } from '../_modellek/esemeny-modell';
import { EloadoService } from '../_szervizek/eloado.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { MufajService } from '../_szervizek/mufaj.service';
import { CimService } from '../_szervizek/cim.service';

@Component({
  selector: 'app-esemeny-kereso',
  templateUrl: './esemenyKereso.component.html',
  styleUrls: ['./esemenyKereso.component.css']
})
export class EsemenyKeresoComponent {
  constructor(public esemenySzerviz:EsemenyService,
              public eloadoSzerviz:EloadoService,
              public helyszinSzerviz:HelyszinService,
              public mufajSzerviz: MufajService,
              public cimSzerviz:CimService) {
    this.mufajBetoltes();
    this.eloadoJavaslatBetoltes();
    this.helyszinJavaslatBetoltes();
    this.helyszinCimBetoltes();
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

  public mufajLista: string[] = [];
  public telepulesLista: string[] = [];
  public eloadoJavaslatok: string[] = [];
  public helyszinJavaslatok: string[] = [];
  public esemenyLista:EsemenyModell[] = [];
  public eloado:string = "";
  public helyszin:string = "";

  get eloadoFilterezett(): string[] {
    return this.filterezo(this.eloadoJavaslatok, this.eloado);
  }

  get helyszinFilterezett(): string[] {
    return this.filterezo(this.helyszinJavaslatok, this.helyszin);
  }

  private filterezo(javaslatok: string[], inputText: string): string[] {
    const filterErtek = inputText.toLowerCase();
    return javaslatok.filter(javaslat => javaslat.toLowerCase().includes(filterErtek));
  }

  esemenyKereses(){
    this.esemenySzerviz.eloadoAdatok(this.eloado,this.helyszin)
      .subscribe((valasz) => {
        this.esemenyLista = valasz;
    },
    (error) => {
      console.error('Hiba az eseménylekérdezésben!', error);
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
}
