import { Component } from '@angular/core';
import { UserService } from '../_szervizek/user.service';
import { UserAzonositasService } from '../_szervizek/user-azonositas.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { UserModell } from '../_modellek/user-modell';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-beallitasok',
  templateUrl: './profil-beallitasok.component.html',
  styleUrls: ['./profil-beallitasok.component.css']
})
export class ProfilBeallitasokComponent {

  public belepesAdatSzerkesztheto:boolean = false
  public emailSzerkesztheto:boolean = false
  public szemelyesAdatSzerkesztheto:boolean = false
  public belepesAdatForm: FormGroup;
  public emailForm: FormGroup;
  public szemelyesAdatForm: FormGroup;
  public regisztraltFelhasznalonevek:any[] = [];
  public regisztraltEmailek:any[] = [];
  public jelenEv:number = new Date().getFullYear();
  public maxEvDatum:string = this.jelenEv-18+"-01-01";
  public minEvDatum:string = this.jelenEv-130+"-01-01";

  user:UserModell = new UserModell();

  constructor(private formBuilder:FormBuilder,
              public userService: UserService,
              public userAzonositas:UserAzonositasService,
              public dialog:MatDialog,
              private _snackBar: MatSnackBar) {
              this.regisztraltFelhasznalokEmailek()
              this.profilAdatBetoltes();
              this.belepesAdatForm = this.formBuilder.group({felhasznalonev:[''],jelszo:[''],uj_jelszo:[''],uj_jelszo_megerosites:['']});
              this.emailForm = this.formBuilder.group({email:[''],email_megerosites:['']});
              this.szemelyesAdatForm = this.formBuilder.group({vezeteknev:[],keresztnev:[],szuletesi_datum:[]});
              this.belepesAdatForm.get('felhasznalonev')?.disable();
              this.belepesAdatForm.get('jelszo')?.disable();
              this.emailForm.get('email')?.disable();
              this.szemelyesAdatForm.get('vezeteknev')?.disable();
              this.szemelyesAdatForm.get('keresztnev')?.disable();
              this.szemelyesAdatForm.get('szuletesi_datum')?.disable();
  }

  jelszoValidator(control: AbstractControl):ValidationErrors|null {
    const regexMinta = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (control.value && !regexMinta.test(control.value)) {
      return { nemMegfeleloJelszo: true };
    }
    return null;
  }

  belepesAdatSzerkesztesClick(){
    this.belepesAdatForm.get('felhasznalonev')?.enable();
    this.belepesAdatForm.get('jelszo')?.enable();
    this.belepesAdatSzerkesztheto=true
    this.belepesAdatForm.get('felhasznalonev')?.addValidators([Validators.minLength(3)]);
    this.belepesAdatForm.get('uj_jelszo')?.addValidators([this.jelszoValidator]);
    this.belepesAdatForm.addValidators(this.jelszoEgyezesValidator);
  }

  emailSzerkesztesClick(){
    this.emailForm.get('email')?.enable();
    console.log(this.emailForm.get('email'))
    this.emailSzerkesztheto=true
    this.emailForm.get('email')?.addValidators([this.emailValidator]);
    this.emailForm.addValidators(this.emailEgyezesValidator);
  }

  szemelyesAdatSzerkesztesClick(){
    this.szemelyesAdatForm.get('vezeteknev')?.enable();
    this.szemelyesAdatForm.get('keresztnev')?.enable();
    this.szemelyesAdatForm.get('szuletesi_datum')?.enable();
    this.szemelyesAdatSzerkesztheto=true
  }

  belepesAdatReset(){
    this.belepesAdatSzerkesztheto = false;
    this.belepesAdatForm.get('felhasznalonev')?.disable();
    this.belepesAdatForm.get('jelszo')?.disable();
    this.belepesAdatForm.reset();
  }

  emailReset(){
    this.emailSzerkesztheto = false;
    this.emailForm.get('email')?.disable();
    this.emailForm.reset();
  }

  szemelyesAdatReset(){
    this.szemelyesAdatSzerkesztheto = false;
    this.szemelyesAdatForm.get('vezeteknev')?.disable();
    this.szemelyesAdatForm.get('keresztnev')?.disable();
    this.szemelyesAdatForm.get('szuletesi_datum')?.disable();
    this.szemelyesAdatForm.reset();
  }
  emailEgyezesValidator(control: AbstractControl):ValidationErrors|null {
    const uj_jelszo = control.get('email')?.value;
    const uj_jelszo_megerosites = control.get('email_megerosites')?.value;
    if (uj_jelszo !== uj_jelszo_megerosites && uj_jelszo!="" && uj_jelszo_megerosites!="") {
      return { emailKulonbozes: true };
    }
    return null;
  }

  jelszoEgyezesValidator(control: AbstractControl):ValidationErrors|null {
    const uj_jelszo = control.get('uj_jelszo')?.value;
    const uj_jelszo_megerosites = control.get('uj_jelszo_megerosites')?.value;
    if (uj_jelszo !== uj_jelszo_megerosites) {
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

  validFormEllenorzes(form:FormGroup):boolean{
    return form.invalid || this.uresvalidatorTeszt(form);
  }

  uresvalidatorTeszt(form:FormGroup):boolean {
    const allControlsEmpty = Object.keys(form.controls).every(controlName => {
      const control = form.get(controlName);
      return control?.value === '' || control?.value === null;
    });
    return allControlsEmpty;
  }
  
  regisztraltFelhasznalokEmailek(){
    this.userService.userFelhasznalonevek().subscribe((valasz)=>{
      this.regisztraltFelhasznalonevek = valasz.felhasznalonev;
      this.regisztraltEmailek = valasz.email;
      this.belepesAdatForm.get('felhasznalonev')
      ?.addValidators(this.felhasznalonevFoglaltValidator.bind(this));
      this.emailForm.get('email')
      ?.addValidators(this.emailFoglaltValidator.bind(this))
    })
  }

  torlesAblak(enterAnimationDuration:string,exitAnimationDuration:string): void {
    this.dialog.open(ProfilTorles,{width:'250px',enterAnimationDuration,exitAnimationDuration});
  }

  profilAdatBetoltes(){
    this.userService
      .userAdatok(this.userAzonositas.getUserId(),this.userAzonositas.getAuthToken())
      .subscribe((valasz)=>{
        this.userService.bejelentkezettUser.felhasznalonev = valasz.felhasznalonev
        this.userService.bejelentkezettUser.email = valasz.felhasznalonev
        this.userService.bejelentkezettUser.keresztnev = valasz.felhasznalonev
        this.userService.bejelentkezettUser.vezeteknev = valasz.felhasznalonev
        this.userService.bejelentkezettUser.szuletesiDatum = valasz.szuletesi_datum

        console.log(this.userService.bejelentkezettUser)
    })
  }

  profilMentes(formTipus:FormGroup,formTipusString:string,formSzerkesztheto:string){
    this.userService.profilSzerkesztes(this.userAzonositas.getUserId(),this.userAzonositas.getAuthToken(),formTipus.value,formTipusString).subscribe((valasz)=>{
      console.log(valasz);
      this.userService.bejelentkezettUser = valasz.user_adatok
      formTipus.reset();
      
      switch (formSzerkesztheto) {

        case 'belepesAdatSzerkesztheto':
          this.belepesAdatReset()
          break;

        case 'emailSzerkesztheto':
          this.emailReset()
          break;
      
        case 'szemelyesAdatSzerkesztheto':
          this.szemelyesAdatReset()
          break;
      }

      this.openSnackbar(valasz.msg)
    });
  }

  openSnackbar(msg:string){
    this._snackBar.open(msg,undefined,{duration:1500});
  }
}

@Component({
  selector: 'profil-torles',
  template: `<div class="d-block justify-content-center">
              <h1 mat-dialog-title >Profil törlése</h1>
              <div mat-dialog-actions>
                <button mat-button (click)="megseClick()">Mégse</button>
                <button mat-button (click)="profilTorles()" cdkFocusInitial>Törölni szeretném</button>
              </div>
            <div>`,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule],
})
export class ProfilTorles {

  constructor(public dialogRef: MatDialogRef<ProfilTorles>,
              public userService: UserService,
              public userAzonositasService:UserAzonositasService,
              public cookieService:CookieService,
              private router:Router,
              private _snackBar: MatSnackBar)
              {}

  profilTorles(){
    this.userService.profilTorles(this.userAzonositasService.getUserId(),this.userAzonositasService.getAuthToken()).subscribe({
      next:(response) => {
        this.cookieService.deleteAll();
        this.router.navigate(['/kezdooldal']);
        this.dialogRef.close();
        this.openSnackbar(response.msg)
      },
      error:(error) => {
        console.error('Hiba a törlés során', error);
      }    
    });
  }

  megseClick(){
    this.dialogRef.close();
  }
  
  openSnackbar(msg:string){
    this._snackBar.open(msg,undefined,{duration:1500});
  }
}