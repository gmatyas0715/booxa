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
import { adminGuard, bejelentkezettUserGuard, vendegUserGuard } from './auth/auth.guard';
import { MufajDataComponent } from './_adat-megjelenito/mufaj-data/mufaj-data.component';
import { EloadoDataComponent } from './_adat-megjelenito/eloado-data/eloado-data.component';
import { UserDataComponent } from './_adat-megjelenito/user-data/user-data.component';
import { SikeresFizetesComponent } from './_rendeles_responsok/sikeres-rendeles/sikeres-fizetes.component';
import { SikertelenFizetesComponent } from './_rendeles_responsok/sikertelen-rendeles/sikertelen-fizetes.component';
import { CimDataComponent } from './_adat-megjelenito/cim-data/cim-data.component';
import { HelyszinDataComponent } from './_adat-megjelenito/helyszin-data/helyszin-data.component';
import { EsemenyDataComponent } from './_adat-megjelenito/esemeny-data/esemeny-data.component';
import { DataComponent } from './data/data.component';

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
      title:'Kosár összegző',
      path:'kosarOsszegzo',
      component:KosarOsszegzoComponent  
    },
    {
      title:'Helyszín adatok',
      path:'data',
      component:DataComponent,
      children: [
        {
          title:'Műfaj adatok',
          path:'mufaj',
          component:MufajDataComponent
        },
        {
          title:'Előadó adatok',
          path:'eloado',
          component:EloadoDataComponent
        },
        {
          title:'User adatok',
          path:'user',
          component:UserDataComponent
        },
        {
          title:'Cím adatok',
          path:'cim',
          component:CimDataComponent
        },
        {
          title:'Helyszín adatok',
          path:'helyszin',
          component:HelyszinDataComponent
        },
        {
          title:'Esemény adatok',
          path:'esemeny',
          component:EsemenyDataComponent
        },
      ]},
    {
      title:'Sikeres fizetés',
      path:'rendeles/sikeres-fizetes',
      component:SikeresFizetesComponent
    },
    {
      title:'Sikertelen fizetés',
      path:'rendeles/sikertelen-fizetes',
      component:SikertelenFizetesComponent
    }
  ];

const vendegUserRoutes = [{
  canActivate: [vendegUserGuard],
  path:'',
  children: [
    {
      title:'Bejelentkezés',
      path:'bejelentkezes',
      component:BejelentkezesUserComponent  
    },
    {
      title:'Regisztráció',
      path:'regisztracio',
      component:RegisztracioComponent  
    },
  ]
}];
const bejelentkezettUserRoutes = [{
  canActivate: [bejelentkezettUserGuard],
  path:'',
  children: [{
      title:'Profil adatok',
      path:'profilAdatok',
      component:ProfilBeallitasokComponent
    },
    {
      title:'Számlázási adatok',
      path:'szamlazasiAdatok',
      component:SzamlazasiAdatokComponent  
    },
    {
      title:'Jegyvásárlás előzmények',
      path:'jegyVasarlasElozmenyek',
      component:JegyVasarlasElozmenyekComponent
    },]
  }];

  const adminRoutes = [{
    canActivate: [adminGuard],
    path:'',
    children: [
]
  }];

@NgModule({
  imports: [RouterModule.forRoot(generalRoutes),RouterModule.forChild(vendegUserRoutes),RouterModule.forChild(bejelentkezettUserRoutes),RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
