import { Component } from '@angular/core';
import { UserService } from '../_szervizek/user.service';
import { EloadoModell } from '../_modellek/eloado-modell';

@Component({
  selector: 'app-kezdooldal',
  templateUrl: './kezdooldal.component.html',
  styleUrls: ['./kezdooldal.component.css']
})
export class KezdooldalComponent {
    constructor(protected userService: UserService) {

    }

}
