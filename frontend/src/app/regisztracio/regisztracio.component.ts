import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserModell } from '../_modellek/user-modell';
import { AbstractControl } from '@angular/forms';
import { UserService } from '../_szervizek/user.service';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent {

  public regisztraloUser:UserModell = new UserModell();
  public jelenEv:number = new Date().getFullYear();
  public maxEvDatum:string = this.jelenEv-18+"-01-01"
  public minEvDatum:string = this.jelenEv-130+"-01-01"
  regisztracioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public szerviz:UserService) {
        this.regisztracioForm = this.formBuilder.group({
        vezeteknev: ['',[Validators.required]],
        keresztnev: ['',[Validators.required]],
        email: ['',[Validators.required,this.emailValidator]],
        nem: ['',[Validators.required]],
        szulDatum: ['',[Validators.required]],
        felhasznalonev: ['',[Validators.required,Validators.minLength(3)]],
        jelszo: ['',[Validators.required,this.jelszoValidator]],
        jelszoUjra:['',[Validators.required]],
        hirlevel: false,
        adatvedelmi: ['',[Validators.required]],
      },{validators: this.jelszoEgyezesValidator});
    }

  regisztracioGomb():void{
    console.warn('Regisztrációs adatok sikeresen feldolgozva', this.regisztracioForm.value);
    this.regisztracioForm.reset();
  }
  
  jelszoValidator(control: AbstractControl):ValidationErrors|null {
    const regexMinta = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (control.value && !regexMinta.test(control.value)) {
      return { nemMegfeleloJelszo: true };
    }
    return null;
  }

  jelszoEgyezesValidator(control: AbstractControl):ValidationErrors|null {
    const jelszo = control.get('jelszo')?.value;
    const jelszoUjra = control.get('jelszoUjra')?.value;
    if (jelszo !== jelszoUjra) {
      return { jelszoKulonbozes: true };
    }
    return null;
  }

  emailValidator(control: AbstractControl):ValidationErrors|null {
    const regexMinta = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !regexMinta.test(control.value)) {
      return { nemMegfeleloEmail: true };
    }
    return null;
  }

  validFormEllenorzes():boolean{
    return this.regisztracioForm.invalid;
  }
}
