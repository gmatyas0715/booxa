import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FejlecComponent } from './fejlec/fejlec.component';
import { LablecComponent } from './lablec/lablec.component';
import { KosarComponent } from './kosar/kosar.component';
import { BalMenusavComponent } from './bal-menusav/bal-menusav.component';
import { EloadasHelyszinComponent } from './eloadas-helyszin/eloadas-helyszin.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeresesComponent } from './kereses/kereses.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezettUserComponent } from './bejelentkezett-user/bejelentkezett-user.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';
import { KosarKicsiComponent } from './kosar-kicsi/kosar-kicsi.component';

@NgModule({
  declarations: [
    AppComponent,
    FejlecComponent,
    LablecComponent,
    KosarComponent,
    BalMenusavComponent,
    EloadasHelyszinComponent,
    KezdooldalComponent,
    KeresesComponent,
    RegisztracioComponent,
    BejelentkezettUserComponent,
    BejelentkezesUserComponent,
    KosarKicsiComponent
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
