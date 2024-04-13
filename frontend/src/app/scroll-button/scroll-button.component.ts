import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.css']
})
export class ScrollButtonComponent {
  public gombLathatosaga: boolean = false;

  @HostListener('window:scroll', [])
  ablakGorgetve(): void {

    this.gombLathatosaga = window.scrollY > 20;
  }


  public gorgetesOldalTetejere(): void {

    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  
}
