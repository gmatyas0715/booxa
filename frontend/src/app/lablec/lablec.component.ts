import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-lablec',
  templateUrl: './lablec.component.html',
  styleUrls: ['./lablec.component.css']
})
export class LablecComponent {
  footerVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight-50) {
      this.footerVisible = true;
    }
    else {
      this.footerVisible = false;
    }
  }
}
