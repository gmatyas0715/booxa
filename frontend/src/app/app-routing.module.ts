import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { EloadasHelyszinComponent } from './eloadas-helyszin/eloadas-helyszin.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { KosarComponent } from './kosar/kosar.component';
import { KezdooldalComponent } from './kezdooldal/kezdooldal.component';

const routes: Routes = [
    {
      title:'Előadas helyszín',
      path:'eloadasHelyszin',
      component:EloadasHelyszinComponent 
    },
    {
      title:'Bejelentkezés',
      path:'bejelentkezes',
      component:BejelentkezesComponent  
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
    }
  ]

  ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
