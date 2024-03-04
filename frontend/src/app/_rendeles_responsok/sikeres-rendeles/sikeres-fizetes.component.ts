import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RendelesService } from 'src/app/_szervizek/rendeles.service';
import { UserAzonositasService } from 'src/app/_szervizek/user-azonositas.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-sikeres-fizetes',
  templateUrl: './sikeres-fizetes.component.html',
  styleUrls: ['./sikeres-fizetes.component.css']
})
export class SikeresFizetesComponent implements OnInit{
    
  session_id: string | null = "";
  rendeles_id = "1";
  userId = "";
  notFound = true;
  betoltes = true;

  constructor(private route: ActivatedRoute,
              private rendelesService:RendelesService,
              private http:HttpClient,
              private userAzonositasSzerviz:UserAzonositasService) {
    
  }

  ngOnInit(): void {
    console.log('dhaoidh');
    this.session_id = this.route.snapshot.queryParamMap.get('session_id');
    if (this.session_id){
      this.rendelesService.sessionData(this.session_id).subscribe({
        next:(valasz)=>{
          if (valasz.error=='not_found'){
            this.notFound = true
            this.betoltes = false
            console.log("if not found");
          }
  
          else {
            this.notFound = false
            this.userId = valasz.user.id
            this.rendeles_id = valasz.rendeles_id
            this.betoltes = false
            console.log("else not found");

          }
        },
        error:()=>{
          this.notFound = true
          this.betoltes = false
          console.log("error not found");

        }
      })
    }
  }

  jegyPdfGeneralas(): any {
    var mediaType = 'application/pdf';
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.userAzonositasSzerviz.getAuthToken()}`
    }) 

    this.http.post('http://localhost:8000/api/pdf-jegy-generalas/'+this.rendeles_id, {location: "report.pdf"}, { responseType: 'blob',headers}).subscribe({
      next:(pdfData:any) => {
        var blob = new Blob([pdfData], { type: mediaType });
        saveAs(blob, 'jegy.pdf');
      },
      error:(error:any) => {
        console.log(error);
      }
    })
  }
}
