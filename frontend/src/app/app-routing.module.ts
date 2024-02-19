import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { KosarOsszegzoComponent } from './kosar-osszegzo/kosar-osszegzo.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { EsemenyKeresoComponent } from './esemeny-kereso/esemeny-kereso.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { SzamlazasiAdatokComponent } from './szamlazasi-adatok/szamlazasi-adatok.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';
import { ProfilBeallitasokComponent } from './profil-beallitasok/profil-beallitasok.component';
import { JegyVasarlasElozmenyekComponent } from './jegy-vasarlas-elozmenyek/jegy-vasarlas-elozmenyek.component';
import { adminGuard, regisztraltUserGuard } from './auth/auth.guard';
import { AdatSzerkesztoComponent } from './adat-szerkeszto/adat-szerkeszto.component';

const generalRoutes: Routes = [
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
      title:'Bejelentkezés',
      path:'bejelentkezes',
      component:BejelentkezesUserComponent  
    },

  ];

const regisztraltUserRoutes = [{
  canActivate: [regisztraltUserGuard],
  path:'',
  children: [{
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
      title:'Számlázási adatok',
      path:'szamlazasiAdatok',
      component:SzamlazasiAdatokComponent  
    },
    {
      title:'Kosár összegző',
      path:'kosarOsszegzo',
      component:KosarOsszegzoComponent  
    }]
  }];

  const adminRoutes = [{
    canActivate: [adminGuard],
    path:'',
    children: [{
      title:'Adatok szerkesztése',
      path:'szerkesztoiFelulet',
      component:AdatSzerkesztoComponent
    }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(generalRoutes),RouterModule.forChild(regisztraltUserRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
