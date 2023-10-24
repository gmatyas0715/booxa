import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-esemeny-reszletek',
  templateUrl: './esemeny-reszletek.component.html',
  styleUrls: ['./esemeny-reszletek.component.css']
})
export class EsemenyReszletekComponent {
/*@ViewChild('canvas') canvasRef: ElementRef | null = null;
  
  ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement = this.canvasRef?.nativeElement;
    const ctx = canvas?.getContext('2d');


    window.addEventListener('resize',function(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    let mouse: {
      x: number,
      y: number,
    } = {x:0,y:0}

    canvas.addEventListener('mousemove',function(event){
      mouse.x = event.x;
      mouse.y = event.y;
      drawCircle();
    });

    function drawCircle(){
      if (ctx!=null){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(mouse.x,mouse.y,50,0,Math.PI*2);
        ctx.fill();
      }
    }
  }*/
}
