import { Component } from '@angular/core';
import { RendelesService } from '../_szervizek/rendeles.service';

@Component({
  selector: 'app-jegy-vasarlas-elozmenyek',
  templateUrl: './jegy-vasarlas-elozmenyek.component.html',
  styleUrls: ['./jegy-vasarlas-elozmenyek.component.css']
})
export class JegyVasarlasElozmenyekComponent {

  korabbiVasarlasok:any[] = []
  constructor(public rendelesService:RendelesService) {
    this.korabbiRendelesekLekerdezese()
  }

    trackById(index: number, kosarElem: any): number {
    return kosarElem.id;
  }

  korabbiRendelesekLekerdezese(){
    this.rendelesService.korabbiVasarlasokLekerdezese().subscribe((korabbiVasarlasok)=>{
      console.log(korabbiVasarlasok);
      
      this.korabbiVasarlasok = korabbiVasarlasok[0]
    })
  }
}
