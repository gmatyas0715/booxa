import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public rendelesFeldolgozas = false;
  szamlazasiAdatForm: FormGroup;

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
      });
    }

  megrendelesElkuldes():void{
    this.rendelesFeldolgozas = true
    console.warn('Rendelés elküldve!');
    console.log(typeof(this.szamlazasiAdatForm.value));
    this.rendelesSzerviz.rendelesElkuldes(this.rendelesSzerviz.rendelesAdatOsszeallitas(this.szamlazasiAdatForm.value)).subscribe({
      next:(valasz:any)=>{
        if (valasz.redirect_url) {
          window.location.href = valasz.redirect_url;
          this.rendelesFeldolgozas = false
        } else {
          
        }
      },
      error:()=>{

      }
    })
  }

  validFormEllenorzes():boolean{
    return this.szamlazasiAdatForm.invalid;
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

  get hazszam(){
    return this.szamlazasiAdatForm.get('hazszam');
  }
}
