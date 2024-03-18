import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { KosarComponent as KosarComponent } from './kosar/kosar.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { EsemenyKeresoComponent } from './esemeny-kereso/esemeny-kereso.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { SzamlazasiAdatokComponent } from './szamlazasi-adatok/szamlazasi-adatok.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';
import { ProfilBeallitasokComponent } from './profil-beallitasok/profil-beallitasok.component';
import { JegyVasarlasElozmenyekComponent } from './jegy-vasarlas-elozmenyek/jegy-vasarlas-elozmenyek.component';
import { adminGuard, bejelentkezettUserGuard, bejelentkezettUserGuard404, esemenyszerkesztoVagyAdminGuard, vendegUserGuard, kosarCheck } from './_auth/auth.guard';
import { MufajDataComponent } from './_adat-megjelenito/mufaj-data/mufaj-data.component';
import { EloadoDataComponent } from './_adat-megjelenito/eloado-data/eloado-data.component';
import { UserDataComponent } from './_adat-megjelenito/user-data/user-data.component';
import { SikeresFizetesComponent } from './_rendeles_responsok/sikeres-fizetes/sikeres-fizetes.component';
import { CimDataComponent } from './_adat-megjelenito/cim-data/cim-data.component';
import { HelyszinDataComponent } from './_adat-megjelenito/helyszin-data/helyszin-data.component';
import { EsemenyDataComponent } from './_adat-megjelenito/esemeny-data/esemeny-data.component';
import { DataComponent } from './_adat-megjelenito/data/data.component';
import { Error404Component } from './_rendeles_responsok/error-404/error-404.component';


const generalRoutes: Routes = [
  {
    path:'',
    component:KezdooldalComponent
  },
  {
    title:'Esemény részletek',
    path:'esemeny-reszletek/:id',
    component:EsemenyReszletekComponent
  },
  {
    title:'Kezdőoldal',
    path:'kezdooldal',
    component:KezdooldalComponent  
  },
  {
    title:'Eseménykereső',
    path:'esemeny-kereso',
    component:EsemenyKeresoComponent 
  },
  {
    title:'Kosár',
    path:'kosar',
    component:KosarComponent  
  },
  {
    title:'Error 404',
    path:'**',
    component:Error404Component
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
    {
      path:'',
      component:KezdooldalComponent
    }
  ]
}];

const bejelentkezettUserRoutes = [{
  canActivate: [bejelentkezettUserGuard],
  path:'',
  children: [{
      title:'Profil adatok',
      path:'profil-adatok',
      component:ProfilBeallitasokComponent
    },
    {
      canActivate: [kosarCheck],
      title:'Számlázási adatok',
      path:'szamlazasi-adatok',
      component:SzamlazasiAdatokComponent  
    },
    {
      title:'Jegyvásárlás előzmények',
      path:'jegyvasarlas-elozmenyek',
      component:JegyVasarlasElozmenyekComponent
    },
    {
      title:'Sikeres fizetés',
      path:'rendeles/sikeres-fizetes',
      component:SikeresFizetesComponent
  }]
}];

const adminEsemenyszerkesztoRoutes = [{
  canActivate: [bejelentkezettUserGuard404,esemenyszerkesztoVagyAdminGuard],
  title:'',
  path:'data',
  component:DataComponent,
    children: [{
      title:'Esemény adatok',
      path:'esemeny',
      component:EsemenyDataComponent
    },
    {
      canActivate: [adminGuard],
      title:'Műfaj adatok',
      path:'mufaj',
      component:MufajDataComponent
    },
    {      
      canActivate: [adminGuard], 
      title:'Előadó adatok',
      path:'eloado',
      component:EloadoDataComponent
    },
    {
      canActivate: [adminGuard], 
      title:'User adatok',
      path:'user',
      component:UserDataComponent
    },
    {
      canActivate: [adminGuard], 
      title:'Cím adatok',
      path:'cim',
      component:CimDataComponent
    },
    {
      canActivate: [adminGuard], 
      title:'Helyszín adatok',
      path:'helyszin',
      component:HelyszinDataComponent
    }
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(vendegUserRoutes),RouterModule.forChild(adminEsemenyszerkesztoRoutes),RouterModule.forChild(bejelentkezettUserRoutes),RouterModule.forRoot(generalRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
