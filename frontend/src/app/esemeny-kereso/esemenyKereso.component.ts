import { Component } from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { EloadoService } from '../_szervizek/eloado.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { NevJson } from '../nev-json';

@Component({
  selector: 'app-esemeny-kereso',
  templateUrl: './esemenyKereso.component.html',
  styleUrls: ['./esemenyKereso.component.css']
})
export class EsemenyKeresoComponent {
  constructor(public eloadoSzerviz: EloadoService,
              public helyszinSzerviz: HelyszinService,
              public esemenySzerviz:EsemenyService) {

              this.eloadoJavaslatBetoltes();
              this.helyszinJavaslatBetoltes();
  }

  public eloadoJavaslatok: string[] = [];
  public helyszinJavaslatok: string[] = [];
  public esemenyLista:any[] = [];
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
      console.error('Error fetching products:', error);
    });
  }

  eloadoKepUrl(kepNev: string): string{
    return 'http://localhost:8000/eloado-kep/'+kepNev;
  }

  helyszinKepUrl(kepNev: string): string{
    return 'http://localhost:8000/helyszin-kep/'+kepNev;
  }

  eloadoJavaslatBetoltes(){
    this.eloadoSzerviz.eloadokNevekLekerdezese().subscribe((valasz:NevJson[])=>{
      this.eloadoJavaslatok = valasz.map(item => item.nev);
    });
  }

  helyszinJavaslatBetoltes(){
    this.helyszinSzerviz.helyszinNevekLekerdezese().subscribe((valasz:NevJson[])=>{
      this.helyszinJavaslatok = valasz.map(item => item.nev);
    });
  }

  mufajok:string[] = 
  [
    "rock",
    "pop",
    "folk",
    "klasszikus",
    "disco"
  ];

  ferohelyek:string[] = 
  [
    "0-500",
    "501-2000",
    "2001-5000",
    "5001-10000",
    "10000<"
  ];

  varosok:string[] = 
  [
    "Miskolc",
    "Budapest",
    "Pécs",
    "Szombathely",
    "Répcelak"
  ];

  keresesEredmenyek:string[] = [
    'Tankcsapda',
    'System of a down',
    'Ariana Grande',
    'Snarky Puppy',
    '30Y'
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
