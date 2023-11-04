import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { KosarOsszegzoComponent } from './kosar-osszegzo/kosar-osszegzo.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { EsemenyKeresoComponent } from './esemeny-kereso/esemenyKereso.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { KedvencekComponent } from './kedvencek/kedvencek.component';
import { SzallitasReszletekComponent } from './szallitas-reszletek/szallitas-reszletek.component';
import { BejelentkezesUserComponent } from './bejelentkezes-user/bejelentkezes-user.component';

const routes: Routes = [
  
    {
      title:'Esemény részletek',
      path:'esemenyReszletek',
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
      title:'Kedvelt helyszínek/előadók',
      path:'kedvencek',
      component:KedvencekComponent  
    },
    {
      title:'Szállítás részletek',
      path:'szallitasReszletek',
      component:SzallitasReszletekComponent  
    },
    {
      title:'Bejelentkezés',
      path:'bejelentkezes',
      component:BejelentkezesUserComponent  
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
