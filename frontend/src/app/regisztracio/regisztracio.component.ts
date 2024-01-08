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
  public regisztraltFelhasznalonevek:any[] = [];
  public regisztraltEmailek:any[] = [];
  regisztracioForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    public szerviz:UserService,
    private userService:UserService) {
        this.regisztraltFelhasznalokEmailek()
        this.regisztracioForm = this.formBuilder.group({
        vezeteknev: ['',[Validators.required]],
        keresztnev: ['',[Validators.required]],
        email: ['',[Validators.required,this.emailValidator]],
        nem: ['',[Validators.required]],
        szuletesi_datum: ['',[Validators.required]],
        felhasznalonev: ['',[Validators.required,Validators.minLength(3)]],
        jelszo: ['',[Validators.required,this.jelszoValidator]],
        jelszo_megerosites:['',[Validators.required]],
        hirlevel: false,
        adatvedelmi: ['',[Validators.required]],
      },{validators: this.jelszoEgyezesValidator});
    }

  regisztracioGomb():void{
    this.userService.userRegisztralas(this.regisztracioForm.value).subscribe(()=>{
      console.warn('Regisztrációs adatok sikeresen feldolgozva')
  })
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
    const jelszo_megerosites = control.get('jelszo_megerosites')?.value;
    if (jelszo !== jelszo_megerosites) {
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

  felhasznalonevFoglaltValidator(control: AbstractControl):ValidationErrors|null{
      if (this.regisztraltFelhasznalonevek.includes(control.value)){
        return {foglaltFelhasznalonev:true};
      }
    return null;
  }

  emailFoglaltValidator(control: AbstractControl):ValidationErrors|null{
    if (this.regisztraltEmailek.includes(control.value)){
      return {foglaltEmail:true};
    }
  return null;
}

  validFormEllenorzes():boolean{
    return this.regisztracioForm.invalid;
  }

  regisztraltFelhasznalokEmailek(){
    this.userService.userFelhasznalonevek().subscribe((valasz)=>{
      this.regisztraltFelhasznalonevek = valasz.felhasznalonev;
      this.regisztraltEmailek = valasz.email;
      this.regisztracioForm.get('felhasznalonev')
      ?.addValidators(this.felhasznalonevFoglaltValidator.bind(this));
      this.regisztracioForm.get('email')
      ?.addValidators(this.emailFoglaltValidator.bind(this))
    })
  }
}
