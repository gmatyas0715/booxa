import { Component } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  public routerLinkMap:Map<[string,string],boolean> = new Map<[string,string],boolean>([
    [["/data/user","Userek"],true],
    [["/data/helyszin","Helyszínek"],false],
    [["/data/mufaj","Műfajok"],false],
    [["/data/eloado","Előadók"],false],
    [["/data/esemeny","Események"],false],
    [["/data/cim","Címek"],false],
  ])
}
