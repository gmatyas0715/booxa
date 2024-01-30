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

  public jelenEv:number = new Date().getFullYear();
  public maxEvDatum:string = this.jelenEv-12+"-01-01"
  public minEvDatum:string = this.jelenEv-130+"-01-01"
  szamlazasiAdatForm: FormGroup;
  bankkartyaAdatForm: FormGroup;
  fizetesiMod:string = "";

  constructor(
    private formBuilder: FormBuilder,
    public userSzerviz:UserAzonositasService,
    public kosarSzerviz:KosarService,
    public rendelesSzerviz:RendelesService,
    public router:Router) {
      this.szamlazasiAdatForm = this.formBuilder.group({
        vezeteknev: ['',[Validators.required]],
        keresztnev: ['',[Validators.required]],
        email: ['',[Validators.required,Validators.email]],
        iranyitoszam: ['',[Validators.required]],
        telepules: ['',[Validators.required]],
        kozterulet: ['',[Validators.required]],
        hazszam: ['',[Validators.required]],
        fizetesmod: ['',[Validators.required]],
      });
      this.bankkartyaAdatForm = this.formBuilder.group({
        bankkartyaSzam: ['',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(16),Validators.minLength(16)]],
        kartyaTulajdonos: ['',[Validators.required]],
        bankkartyaLejarat: ['',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(4),Validators.minLength(4)]],
        cvvKod: ['',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(3),Validators.minLength(3)]],
      });
    }

  megrendelesElkuldes():void{
    console.warn('Rendelés elküldve!');
    console.log(typeof(this.szamlazasiAdatForm.value));
    this.rendelesSzerviz.rendelesElkuldes(this.rendelesSzerviz.rendelesAdatOsszeallitas(this.szamlazasiAdatForm.value,this.bankkartyaAdatForm.value)).subscribe({
      next:()=>{
        this.kosarSzerviz.jegyAdatLista = [];
        this.router.navigate(['/kezdooldal']);
        this.szamlazasiAdatForm.reset();
      },
      error:()=>{

      }
    })
  }

  validFormEllenorzes():boolean{
    return this.szamlazasiAdatForm.invalid || this.bankkartyaAdatForm.invalid;
  }

  // SzamlazasiAdatForm formcontrol accessor-ok

  get vezeteknev(){
    return this.szamlazasiAdatForm.get('vezeteknev');
  }

  get keresztnev(){
    return this.szamlazasiAdatForm.get('keresztnev');
  }

  get email(){
    return this.szamlazasiAdatForm.get('email');
  }

  get iranyitoszam(){
    return this.szamlazasiAdatForm.get('iranyitoszam');
  }

  get telepules(){
    return this.szamlazasiAdatForm.get('telepules');
  }

  get kozterulet(){
    return this.szamlazasiAdatForm.get('kozterulet');
  }

  get fizetesmod(){
    return this.szamlazasiAdatForm.get('fizetesmod');
  }

  get hazszam(){
    return this.szamlazasiAdatForm.get('hazszam');
  }

  // BankkartyaAdatForm formcontrol accessor-ok

  get bankkartyaSzam(){
    return this.bankkartyaAdatForm.get('bankkartyaSzam');
  }

  get kartyaTulajdonos(){
    return this.bankkartyaAdatForm.get('kartyaTulajdonos');
  }

  get bankkartyaLejarat(){
    return this.bankkartyaAdatForm.get('bankkartyaLejarat');
  }

  get cvvKod(){
    return this.bankkartyaAdatForm.get('cvvKod');
  }
}
