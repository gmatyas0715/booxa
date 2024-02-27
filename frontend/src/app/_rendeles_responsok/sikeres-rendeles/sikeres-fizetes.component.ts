import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RendelesService } from 'src/app/_szervizek/rendeles.service';

@Component({
  selector: 'app-sikeres-fizetes',
  templateUrl: './sikeres-fizetes.component.html',
  styleUrls: ['./sikeres-fizetes.component.css']
})
export class SikeresFizetesComponent implements OnInit{
    
  session_id: string | null = "";
  rendeles_id = "";
  user = "";
  notFound = false;

  constructor(private route: ActivatedRoute, private rendelesService:RendelesService) {
    
  }

  ngOnInit(): void {
    console.log('dhaoidh');
    this.session_id = this.route.snapshot.queryParamMap.get('session_id');
    if (this.session_id){
      this.rendelesService.sessionData(this.session_id).subscribe((valasz)=>{
        console.log(this.session_id);
        console.log(valasz);
        
        if (valasz.error=='not_found_exception'){
          this.notFound = true
        }

        else {
          this.user = valasz.user
          this.rendeles_id = valasz.rendeles_id
          console.log(this.user);
          console.log(this.rendeles_id);            
        }
      })
    }
  }
}
