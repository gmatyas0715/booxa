import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { FejlecComponent } from './fejlec/fejlec.component';
import { LablecComponent } from './lablec/lablec.component';
import { KosarOsszegzoComponent } from './kosar-osszegzo/kosar-osszegzo.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsemenyKeresoComponent } from './esemeny-kereso/esemeny-kereso.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezettUserComponent } from './bejelentkezett-user/bejelentkezett-user.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { SzamlazasiAdatokComponent } from './szamlazasi-adatok/szamlazasi-adatok.component';
import { ElfelejtettJelszoComponent } from './elfelejtett-jelszo/elfelejtett-jelszo.component';
import { ProfilBeallitasokComponent } from './profil-beallitasok/profil-beallitasok.component';
import { JegyVasarlasElozmenyekComponent } from './jegy-vasarlas-elozmenyek/jegy-vasarlas-elozmenyek.component';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';

import { CookieService } from 'ngx-cookie-service';
import { MatIconModule } from '@angular/material/icon';



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
    SzamlazasiAdatokComponent,
    ElfelejtettJelszoComponent,
    ProfilBeallitasokComponent,
    JegyVasarlasElozmenyekComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatStepperModule,
    MatIconModule
  ],
  providers: [CookieService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
