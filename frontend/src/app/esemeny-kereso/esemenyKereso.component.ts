import { Component } from '@angular/core';

@Component({
  selector: 'app-kereses',
  templateUrl: './esemenyKereso.component.html',
  styleUrls: ['./esemenyKereso.component.css']
})
export class EsemenyKeresoComponent {
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
