// Alap
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// @Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Saját komponensek
import { FejlecComponent } from './fejlec/fejlec.component';
import { LablecComponent } from './lablec/lablec.component';
import { KosarComponent } from './kosar/kosar.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { EsemenyKeresoComponent } from './esemeny-kereso/esemeny-kereso.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezettUserComponent } from './bejelentkezett-user/bejelentkezett-user.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { SzamlazasiAdatokComponent } from './szamlazasi-adatok/szamlazasi-adatok.component';
import { ProfilBeallitasokComponent } from './profil-beallitasok/profil-beallitasok.component';
import { JegyVasarlasElozmenyekComponent } from './jegy-vasarlas-elozmenyek/jegy-vasarlas-elozmenyek.component';
import { DataComponent } from './_adat-megjelenito/data/data.component';
import { MufajDataComponent } from './_adat-megjelenito/mufaj-data/mufaj-data.component';
import { EloadoDataComponent } from './_adat-megjelenito/eloado-data/eloado-data.component';
import { UserDataComponent } from './_adat-megjelenito/user-data/user-data.component';
import { CimDataComponent } from './_adat-megjelenito/cim-data/cim-data.component';
import { HelyszinDataComponent } from './_adat-megjelenito/helyszin-data/helyszin-data.component';
import { EsemenyDataComponent } from './_adat-megjelenito/esemeny-data/esemeny-data.component';
import { SikeresFizetesComponent } from './_rendeles_responsok/sikeres-fizetes/sikeres-fizetes.component';
import { Error404Component } from './_rendeles_responsok/error-404/error-404.component';

// Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';

// Ngx
import { CookieService } from 'ngx-cookie-service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';



@NgModule({
  declarations: [
    AppComponent,
    FejlecComponent,
    LablecComponent,
    KosarComponent,
    KezdooldalComponent,
    EsemenyKeresoComponent,
    RegisztracioComponent,
    BejelentkezettUserComponent,
    BejelentkezesUserComponent,
    EsemenyReszletekComponent,
    SzamlazasiAdatokComponent,
    ProfilBeallitasokComponent,
    JegyVasarlasElozmenyekComponent,
    MufajDataComponent,
    EloadoDataComponent,
    UserDataComponent,
    CimDataComponent,
    HelyszinDataComponent,
    EsemenyDataComponent,
    SikeresFizetesComponent,
    Error404Component,
    DataComponent
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
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatBadgeModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
    MatSortModule,
  ],
  providers: [CookieService,DatePipe,provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
