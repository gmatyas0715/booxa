import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { KosarService } from '../_szervizek/kosar.service';
import { RendelesService } from '../_szervizek/rendeles.service';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-szamlazasi-adatok',
  templateUrl: './szamlazasi-adatok.component.html',
  styleUrls: ['./szamlazasi-adatok.component.css']
})
export class SzamlazasiAdatokComponent {

  bankkartyaSzam:string = "";
  lejaratiIdo:string = "";
  kartyaTulajdonos:string = "";
  formazottBankkartyaSzam:string = ""
  formazottLejaratiIdo:string = "";
  public jelenEv:number = new Date().getFullYear();
  public maxEvDatum:string = this.jelenEv-12+"-01-01"
  public minEvDatum:string = this.jelenEv-130+"-01-01"
  fizetesForm: FormGroup;
  fizetesiMod:string = "";

  constructor(
    private formBuilder: FormBuilder,
    public userSzerviz:UserAzonositasService,
    public kosarSzerviz:KosarService,
    public rendelesSzerviz:RendelesService,
    public router:Router) {
        this.fizetesForm = this.formBuilder.group({
        vezeteknev: ['',[Validators.required]],
        keresztnev: ['',[Validators.required]],
        email: ['',[Validators.required,this.emailValidator]],
        iranyitoszam: ['',[Validators.required]],
        telepules: ['',[Validators.required]],
        kozterulet: ['',[Validators.required]],
        hazszam: ['',[Validators.required]],
        fizetesmod: ['',[Validators.required]],
      });
    }

  megrendelesElkuldes():void{
    console.warn('Rendelés elküldve!');
    console.log(typeof(this.fizetesForm.value));
    this.rendelesSzerviz.rendelesElkuldes(this.rendelesSzerviz.rendelesAdatOsszeallitas(this.fizetesForm.value)).subscribe({
      next:()=>{
        
        this.kosarSzerviz.jegyAdatLista = [];
        this.router.navigate(['/kezdooldal']);
        this.fizetesForm.reset();
      },
      error:()=>{

      }
    })
  }
  
  emailValidator(control: AbstractControl):ValidationErrors|null {
    const regexMinta = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !regexMinta.test(control.value)) {
      return { nemMegfeleloEmail: true };
    }
    return null;
  }

  validFormEllenorzes():boolean{
    return this.fizetesForm.invalid;
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
