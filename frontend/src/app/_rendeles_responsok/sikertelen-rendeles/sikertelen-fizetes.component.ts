import { Component } from '@angular/core';

@Component({
  selector: 'app-sikertelen-fizetes',
  templateUrl: './sikertelen-fizetes.component.html',
  styleUrls: ['./sikertelen-fizetes.component.css']
})
export class SikertelenFizetesComponent {
  session_id: string | null = "";
  rendeles_id = "";
  user = "";
  hiba = true;
}
