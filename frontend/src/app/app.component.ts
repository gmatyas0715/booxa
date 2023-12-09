import { Component, OnInit} from '@angular/core';
import { UserService } from './_szervizek/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userInfo: any[] = [];
  constructor(private szerviz:UserService){

  }
  ngOnInit(): void {

  }
}
