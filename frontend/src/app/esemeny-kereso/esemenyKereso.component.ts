import { Component } from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';

@Component({
  selector: 'app-esemeny-kereso',
  templateUrl: './esemenyKereso.component.html',
  styleUrls: ['./esemenyKereso.component.css']
})
export class EsemenyKeresoComponent {
  constructor(public esemenySzerviz:EsemenyService) {
    
  }

  public esemenyLista:any[] = [];
  public eloado:string = "";
  public helyszin:string = "";

  esemenyKereses(){
    console.log(this.eloado,' ',this.helyszin)
    this.esemenySzerviz.eloadoAdatok(this.eloado,this.helyszin)
      .subscribe((valasz) => {
        this.esemenyLista = valasz;
    },
    (error) => {
      console.error('Error fetching products:', error);
    });;
    console.log(this.esemenyLista);
  }

  eloadoKepUrl(kepNev: string): string{
    return 'http://localhost:8000/eloado-kep/'+kepNev;
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
