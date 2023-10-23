import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserModell } from '../_modellek/user-modell';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent {

  public regisztraloUser:UserModell = new UserModell();
  public jelenEv:number = new Date().getFullYear();
  public maxEvDatum:string = this.jelenEv-12+"-01-01"
  public minEvDatum:string = this.jelenEv-130+"-01-01"
  regisztracioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
        this.regisztracioForm = this.formBuilder.group({
        vezeteknev: '',
        keresztnev: '',
        email: '',
        nem: '',
        szulDatum: '',
        felhasznalonev: '',
        jelszo: ['',[Validators.required,this.jelszoValidator]],
        jelszoUjra:['',Validators.required],
        hirlevelPipa: false,
        adatvedelmiPipa: false
      },{validatorok: this.jelszoKulonbozesValidator});
    }

  regisztracioGomb():void{
    console.warn('Regisztrációs adatok sikeresen feldolgozva', this.regisztracioForm.value);
    this.regisztracioForm.reset();
  }
  
  jelszoValidator(control: AbstractControl):ValidationErrors|null {
    const regexMinta = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    console.log(regexMinta)
    if (control.value && !regexMinta.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  jelszoKulonbozesValidator(control: AbstractControl):ValidationErrors|null {
    const jelszo = control.get('jelszo')?.value;
    const jelszoUjra = control.get('jelszoUjra')?.value;
    console.log(jelszo)
    if (jelszo !== jelszoUjra (jelszo && jelszoUjra)) {
      return { jelszoKulonbozes: true };
    }
    return null;
  }
}
