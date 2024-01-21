import { Component } from '@angular/core';

@Component({
  selector: 'app-bankkartya',
  templateUrl: './bankkartya.component.html',
  styleUrls: ['./bankkartya.component.css']
})
export class BankkartyaComponent {

  bankkartyaSzam:string = "";
  lejaratiIdo:string = "";
  kartyaTulajdonos:string = "";
  formazottBankkartyaSzam:string = ""
  formazottLejaratiIdo:string = "";

  constructor() { 
  }

  bankkartyaSzamFormazasa(){
    switch (this.formazottBankkartyaSzam.length) {
      case 4:
        this.formazottBankkartyaSzam+=" "
        break;
      case 9:
        this.formazottBankkartyaSzam+=" "
        break; 
      case 14:
        this.formazottBankkartyaSzam+=" "
        break;
    }
  }

  bankkartyaLejaratFormazasa(){
    if (this.formazottLejaratiIdo.length==2) {
      this.formazottLejaratiIdo+="/"
    }
  }
}
