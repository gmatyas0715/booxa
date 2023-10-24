import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { KosarComponent } from './kosar/kosar.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';
import { KeresesComponent } from './esemeny-kereso/esemenyKereso.component';
import { EsemenyReszletekComponent } from './esemeny-reszletek/esemeny-reszletek.component';
import { KedvencekComponent } from './kedvencek/kedvencek.component';

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
      title:'Kosár',
      path:'kosar',
      component:KosarComponent  
    },
    {
      title:'Kezdőoldal',
      path:'kezdooldal',
      component:KezdooldalComponent  
    },
    {
      title:'Esemény kereső',
      path:'esemenyKereso',
      component:KeresesComponent  
    },
    {
      title:'Kedvelt helyszínek/előadók',
      path:'kedvencek',
      component:KedvencekComponent  
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
