import { Component } from '@angular/core';

@Component({
  selector: 'app-esemeny-kereso',
  templateUrl: './esemenyKereso.component.html',
  styleUrls: ['./esemenyKereso.component.css']
})
export class EsemenyKeresoComponent {
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

  mostDatum:Date = new Date();

  ev:number = this.mostDatum.getFullYear();
  honap:string = String(this.mostDatum.getMonth() + 1).padStart(2, '0');
  nap:string = String(this.mostDatum.getDate()).padStart(2, '0');

  maiDatum = `${this.ev}-${this.honap}-${this.nap}`;
  esemenyDatum:string = "";

  constructor(){
    console.log(this.maiDatum)
  }

  datumTorles(){
    this.esemenyDatum = "";
  }
}
