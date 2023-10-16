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
import { FormsModule } from '@angular/forms';
import { KeresesComponent } from './kereses/kereses.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';

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
    RegisztracioComponent
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
