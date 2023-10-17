import { Component} from '@angular/core';

@Component({
  selector: 'app-bal-menusav',
  templateUrl: './bal-menusav.component.html',
  styleUrls: ['./bal-menusav.component.css']
})
export class BalMenusavComponent {
  bezarvaE = false;

  menuInterakcio(){
    let menuWidth:string = document.getElementById("bal-menu")?.style.width as string;
    if(this.bezarvaE){
      menuWidth = "250px";
      this.bezarvaE = false;
      console.log("menu kinyitva")
    }
    else{
      menuWidth = "0px";
      this.bezarvaE = true;
      console.log("menu bezárva")
    }
  }
}
