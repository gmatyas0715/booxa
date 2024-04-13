import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-progress-bar',
  templateUrl: './scroll-progress-bar.component.html',
  styleUrls: ['./scroll-progress-bar.component.css']
})
export class ScrollProgressBarComponent {
  gorgetesiArany: number = 0;

  @HostListener('window:scroll', [])
  ablakGorgetes() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.gorgetesiArany = (scrollTop / (scrollHeight - clientHeight)) * 100;
  }
}
