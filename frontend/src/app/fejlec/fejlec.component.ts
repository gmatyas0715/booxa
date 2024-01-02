import { Component, HostListener } from '@angular/core';
import { UserService } from '../_szervizek/user.service';
import { KosarService } from '../_szervizek/kosar.service';

@Component({
  selector: 'app-fejlec',
  templateUrl: './fejlec.component.html',
  styleUrls: ['./fejlec.component.css']
})
export class FejlecComponent {
  constructor(public szerviz:UserService,
              public kosarSzerviz:KosarService) {
    
  }
}
