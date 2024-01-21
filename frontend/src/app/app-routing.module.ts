import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { KosarOsszegzoComponent } from './kosar-osszegzo/kosar-osszegzo.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { EsemenyKeresoComponent } from './esemeny-kereso/esemenyKereso.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { SzamlazasiAdatokComponent } from './fizetes-reszletek/szamlazasi-adatok.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';
import { ElfelejtettJelszoComponent } from './elfelejtett-jelszo/elfelejtett-jelszo.component';
import { ProfilBeallitasokComponent } from './profil-beallitasok/profil-beallitasok.component';
import { JegyVasarlasElozmenyekComponent } from './jegy-vasarlas-elozmenyek/jegy-vasarlas-elozmenyek.component';
import { BankkartyaComponent } from './bankkartya/bankkartya.component';

const routes: Routes = [
    {
      path:'',
      component:KezdooldalComponent
    },
    {
      title:'Esemény részletek',
      path:'esemenyReszletek/:id',
      component:EsemenyReszletekComponent
    },
    {
      title:'Regisztráció',
      path:'regisztracio',
      component:RegisztracioComponent  
    },
    {
      title:'Kosár összegző',
      path:'kosarOsszegzo',
      component:KosarOsszegzoComponent  
    },
    {
      title:'Kezdőoldal',
      path:'kezdooldal',
      component:KezdooldalComponent  
    },
    {
      title:'Esemény kereső',
      path:'esemenyKereso',
      component:EsemenyKeresoComponent 
    },
    {
      title:'Számlázási adatok',
      path:'szamlazasiAdatok',
      component:SzamlazasiAdatokComponent  
    },
    {
      title:'Bejelentkezés',
      path:'bejelentkezes',
      component:BejelentkezesUserComponent  
    },
    {
      title:'Elfelejtett jelszó',
      path:'elfelejtettJelszo',
      component:ElfelejtettJelszoComponent
    },
    {
      title:'Profil adatok',
      path:'profilAdatok',
      component:ProfilBeallitasokComponent
    },
    {
      title:'Jegyvásárlás előzmények',
      path:'jegyVasarlasElozmenyek',
      component:JegyVasarlasElozmenyekComponent
    },
    {
      title:'Bankkártya adatok',
      path:'bankkartyaAdatok',
      component:BankkartyaComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
