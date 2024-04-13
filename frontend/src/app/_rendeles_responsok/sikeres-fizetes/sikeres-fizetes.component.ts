import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RendelesService } from 'src/app/_szervizek/rendeles.service';
import { UserAzonositasService } from 'src/app/_auth/user-azonositas.service';
import { saveAs } from 'file-saver';
import { now } from 'lodash';
import { KosarService } from 'src/app/_szervizek/kosar.service';

@Component({
  selector: 'app-sikeres-fizetes',
  templateUrl: './sikeres-fizetes.component.html',
  styleUrls: ['./sikeres-fizetes.component.css']
})
export class SikeresFizetesComponent implements OnInit{
    
  session_id: string | null = "";
  rendeles_id = "";
  userId = "";
  notFound = true;
  betoltes = true;
  jegyekBetoltes = false;
  szamlaBetoltes = false;

  constructor(private route: ActivatedRoute,
              private rendelesService:RendelesService,
              private http:HttpClient,
              private userAzonositasSzerviz:UserAzonositasService,
              private kosarSzerviz:KosarService) {
    
  }

  ngOnInit(): void {
    this.session_id = this.route.snapshot.queryParamMap.get('session_id');
    if (this.session_id){
      this.rendelesService.sessionData(this.session_id).subscribe({
        next:(valasz)=>{
          if (valasz.error=='not_found'){
            this.notFound = true
            this.betoltes = false
          }
  
          else {
            this.notFound = false
            this.userId = valasz.user.id
            this.rendeles_id = valasz.rendeles_id
            this.betoltes = false
          }
          this.kosarSzerviz.rendelesCookieDelete()
          this.kosarSzerviz.kosarKiurites()
        },
        error:()=>{
          this.notFound = true
          this.betoltes = false
          this.kosarSzerviz.rendelesCookieDelete()
          this.kosarSzerviz.kosarKiurites()
        }
      })
    }
  }

  jegyPdfGeneralas(): any {
    this.jegyekBetoltes = true;
    var mediaType = 'application/pdf';
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.userAzonositasSzerviz.getAuthToken()}`
    }) 

    this.http.post('http://localhost:8000/api/pdf-jegy-generalas/'+this.rendeles_id, {location: "report.pdf"}, { responseType: 'blob',headers}).subscribe({
      next:(pdfData:any) => {
        var blob = new Blob([pdfData], { type: mediaType });
        saveAs(blob, 'JEGY_'+this.rendeles_id+'_'+now()+'.pdf');
        this.jegyekBetoltes = false;
      },
      error:(error:any) => {
      }
    })
  }

  szamlaPdfGeneralas(): any {
    this.szamlaBetoltes = true;
    var mediaType = 'application/pdf';
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.userAzonositasSzerviz.getAuthToken()}`
    }) 

    this.http.post('http://localhost:8000/api/pdf-szamla-generalas/'+this.rendeles_id, {location: "report.pdf"}, { responseType: 'blob',headers}).subscribe({
      next:(pdfData:any) => {
        var blob = new Blob([pdfData], { type: mediaType });
        saveAs(blob, 'SZAMLA_'+this.rendeles_id+'_'+now()+'.pdf');
        this.szamlaBetoltes = false;
      }
    })
  }
}
