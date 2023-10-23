import { Component} from '@angular/core';
import { UserService } from './_szervizek/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(szerviz:UserService){

  }
  title = 'frontend';
}
