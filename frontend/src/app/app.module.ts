import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FejlecComponent } from './fejlec/fejlec.component';
import { LablecComponent } from './lablec/lablec.component';
import { KosarComponent } from './kosar/kosar.component';
import { BalMenusavComponent } from './bal-menusav/bal-menusav.component';
import { CimsorComponent } from './cimsor/cimsor.component';
import { KoncerthelyMegjelenitoComponent } from './koncerthely-megjelenito/koncerthely-megjelenito.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';

@NgModule({
  declarations: [
    AppComponent,
    FejlecComponent,
    LablecComponent,
    KosarComponent,
    BalMenusavComponent,
    CimsorComponent,
    KoncerthelyMegjelenitoComponent,
    KezdooldalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
