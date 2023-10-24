import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FejlecComponent } from './fejlec/fejlec.component';
import { LablecComponent } from './lablec/lablec.component';
import { KosarComponent } from './kosar/kosar.component';
import { BalMenusavComponent } from './bal-menusav/bal-menusav.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { FormsModule } from '@angular/forms';
import { KeresesComponent } from './esemeny-kereso/esemenyKereso.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezettUserComponent } from './bejelentkezett-user/bejelentkezett-user.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';
import { KosarKicsiComponent } from './kosar-kicsi/kosar-kicsi.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { KedvencekComponent } from './kedvencek/kedvencek.component';

@NgModule({
  declarations: [
    AppComponent,
    FejlecComponent,
    LablecComponent,
    KosarComponent,
    BalMenusavComponent,
    KezdooldalComponent,
    KeresesComponent,
    RegisztracioComponent,
    BejelentkezettUserComponent,
    BejelentkezesUserComponent,
    KosarKicsiComponent,
    EsemenyReszletekComponent,
    KedvencekComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
