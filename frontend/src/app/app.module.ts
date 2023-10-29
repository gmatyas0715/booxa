import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FejlecComponent } from './fejlec/fejlec.component';
import { LablecComponent } from './lablec/lablec.component';
import { KosarOsszegzoComponent } from './kosar-osszegzo/kosar-osszegzo.component';
import { FelsoMenusavComponent } from './felso-menusav/felso-menusav.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsemenyKeresoComponent } from './esemeny-kereso/esemenyKereso.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezettUserComponent } from './bejelentkezett-user/bejelentkezett-user.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';
import { KosarKicsiComponent } from './kosar-kicsi/kosar-kicsi.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { KedvencekComponent } from './kedvencek/kedvencek.component';
import { SzallitasReszletekComponent } from './szallitas-reszletek/szallitas-reszletek.component';

@NgModule({
  declarations: [
    AppComponent,
    FejlecComponent,
    LablecComponent,
    KosarOsszegzoComponent,
    FelsoMenusavComponent,
    KezdooldalComponent,
    EsemenyKeresoComponent,
    RegisztracioComponent,
    BejelentkezettUserComponent,
    BejelentkezesUserComponent,
    KosarKicsiComponent,
    EsemenyReszletekComponent,
    KedvencekComponent,
    SzallitasReszletekComponent
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
