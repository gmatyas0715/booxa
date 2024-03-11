import { Component } from '@angular/core';
import { UserAzonositasService } from 'src/app/auth/user-azonositas.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  public routerLinkMap:Map<[string,string],boolean> = new Map<[string,string],boolean>([[["/data/esemeny","Események"],true]])
  public szerep: string = ""

  constructor(private userAzonositas:UserAzonositasService) {
    this.userAzonositas.getSzerep().subscribe((valasz)=>{
      this.szerep = valasz.szerep
      this.routerLinkMapFeltoltes()
    })
  }

  routerLinkMapFeltoltes(){
    if (this.szerep=='admin'){
      this.routerLinkMap.set(["/data/mufaj","Műfajok"],false)
      this.routerLinkMap.set(["/data/eloado","Előadók"],false)
      this.routerLinkMap.set(["/data/cim","Címek"],false)
      this.routerLinkMap.set(["/data/helyszin","Helyszínek"],false)
      this.routerLinkMap.set(["/data/user","Userek"],false)
    }
  }
}
