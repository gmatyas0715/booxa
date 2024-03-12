import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { UserModell } from '../_modellek/user-modell';
import { UserService } from '../_szervizek/user.service';
import { UserAzonositasService } from '../auth/user-azonositas.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent {

  public regisztraloUser:UserModell = new UserModell();
  public jelenDatum = new Date()
  public jelenEv = this.jelenDatum.getFullYear()
  public jelenHonap = this.jelenDatum.getMonth()
  public jelenNap = this.jelenDatum.getDate()
  public maxEvDatum:Date = new Date(this.jelenEv-18,this.jelenHonap,this.jelenNap)
  public minEvDatum:Date = new Date(this.jelenEv-130,this.jelenHonap,this.jelenNap)
  public regisztraltFelhasznalonevek:any[] = [];
  public regisztraltEmailek:any[] = [];
  regisztracioForm: FormGroup;
  toltes = false

  constructor(
    private formBuilder: FormBuilder,
    public szerviz:UserService,
    private userService:UserService,
    private userAzonositasService:UserAzonositasService,
    private router: Router,
    private datePipe: DatePipe,
    private _snackbar:MatSnackBar) {
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

  snackbarMegnyitas(siker:boolean){
    let config = new MatSnackBarConfig()
    config.duration = 1500
    if(siker){
      config.panelClass = ['snackSuccess']
      this._snackbar.open("Sikeres regisztráció!",'Mégse',config);
    } 
    else{
      config.panelClass = ['snackFail']
      this._snackbar.open("Regisztráció sikertelen!",'Mégse',config);
    } 
  }

  regisztracioGomb():void{
    this.toltes = true
    this.regisztracioForm.get('szuletesi_datum')?.setValue(this.datePipe.transform(this.regisztracioForm.get('szuletesi_datum')?.value, 'yyyy-MM-dd'))
    this.userService.userRegisztralas(this.regisztracioForm.value).subscribe({
      next:(valasz)=>{
        this.toltes = false
        this.snackbarMegnyitas(true)
        this.userAzonositasService.setUsername(valasz.felhasznalonev);
        this.userAzonositasService.setUserId(valasz.userId);
        this.userAzonositasService.setAuthToken(valasz.token);
        this.router.navigate(['/kezdooldal']);
      },
      error:()=>{
        this.toltes = false
        this.snackbarMegnyitas(false)
      }
    });
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
