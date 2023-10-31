import {Component} from '@angular/core';

@Component({
  selector: 'app-esemeny-reszletek',
  templateUrl: './esemeny-reszletek.component.html',
  styleUrls: ['./esemeny-reszletek.component.css']
})
export class EsemenyReszletekComponent{
  public id:string = "";

  Kattintas(event:Event):void{
      const element = event.target as HTMLElement;
      const elementId = element.id;
      console.log(elementId)
  }

  FillValtoztatas(event:Event){
    const element = event.target as SVGAElement;
    element.style.fill = 'blue';
  }

  FillVisszavaltoztatas(event:Event){
    const element = event.target as SVGAElement;
    element.style.fill = 'white';
  }
}