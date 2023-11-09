import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FejlecComponent } from './fejlec/fejlec.component';
import { LablecComponent } from './lablec/lablec.component';
import { KosarOsszegzoComponent } from './kosar-osszegzo/kosar-osszegzo.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsemenyKeresoComponent } from './esemeny-kereso/esemenyKereso.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezettUserComponent } from './bejelentkezett-user/bejelentkezett-user.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { KedvencekComponent } from './kedvencek/kedvencek.component';
import { SzallitasReszletekComponent } from './szallitas-reszletek/szallitas-reszletek.component';
import { ElfelejtettJelszoComponent } from './elfelejtett-jelszo/elfelejtett-jelszo.component';
import { ProfilBeallitasokComponent } from './profil-beallitasok/profil-beallitasok.component';
import { ProfilBeallitasokSzerkesztesComponent } from './profil-beallitasok-szerkesztes/profil-beallitasok-szerkesztes.component';

@NgModule({
  declarations: [
    AppComponent,
    FejlecComponent,
    LablecComponent,
    KosarOsszegzoComponent,
    KezdooldalComponent,
    EsemenyKeresoComponent,
    RegisztracioComponent,
    BejelentkezettUserComponent,
    BejelentkezesUserComponent,
    EsemenyReszletekComponent,
    KedvencekComponent,
    SzallitasReszletekComponent,
    ElfelejtettJelszoComponent,
    ProfilBeallitasokComponent,
    ProfilBeallitasokSzerkesztesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
