import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { ActivatedRoute } from '@angular/router';
import { JegyAdatModell } from '../_modellek/jegy-adat-modell';
import { SzektorService } from '../_szervizek/szektor.service';
import { SzektorModell } from '../_modellek/szektor-modell';
import { SzektorAlegysegModell } from '../_modellek/szektor-alegyseg-modell';
import { KosarService } from '../_szervizek/kosar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SzektorAlegysegService } from '../_szervizek/szektor-alegyseg.service';

@Component({
  selector: 'app-esemeny-reszletek',
  templateUrl: './esemeny-reszletek.component.html',
  styleUrls: ['./esemeny-reszletek.component.css'],
})
export class EsemenyReszletekComponent implements OnInit, AfterViewInit{
  @ViewChild('svgContainer') svgContainer!: ElementRef;

  kivalasztottEsemeny:any;
  kivalasztottHelyszin:any;
  kivalasztottEloado:any;
  kivalasztottSzektorok:any[] = [];
  kivalasztottSzektor:any;
  kivalasztottSzektorAlegyseg:any;
  kivalasztottUlohelyek:number[] = [];
  szektorFoglaltsagok:Map<string,[boolean,number]> = new Map<string,[boolean,number]>;
  jegyFoglaltDarab:number = 0
  helyszinSvg: string ='';
  jegyKivalasztas_e:boolean = true;
  esemenyId:string;

  constructor(private route: ActivatedRoute,
              public esemenySzerviz:EsemenyService,
              public helyszinSzerviz:HelyszinService,
              public szektorSzerviz:SzektorService,
              public szektorAlegysegSzerviz:SzektorAlegysegService,
              private kosarService:KosarService,
              private _snackBar: MatSnackBar,
              private renderer: Renderer2) {

                this.esemenyId = this.route.snapshot.paramMap.get('id') as string;
                this.szektorFoglaltsag(this.esemenyId);
                this.szektorSzerviz.szektorok(this.esemenyId).subscribe((valasz)=>{
                  this.kivalasztottSzektorok = valasz;
                });
  }

  ngOnInit(): void {
    this.esemenySzerviz.esemenyAdatok(this.esemenyId).subscribe((valasz)=>{
      this.kivalasztottEsemeny=valasz;
      this.kivalasztottHelyszin = this.kivalasztottEsemeny.helyszin;
      this.kivalasztottEloado = this.kivalasztottEsemeny.eloado;
    });
  }

  ngAfterViewInit(): void {
    this.helyszinSvgBetoltes();
  }

  szektorSzinezes(group:string){
    const svg = document.querySelector("svg");
    const element = svg!.getElementById(group);
    const childElements = element.children;

    for (let i = 0; i < childElements.length; i++) {
      const child = childElements[i];
      console.log(child)
      this.renderer.setStyle(child, 'opacity', 50);
    }
  }

  clickEvent(group:string){
    console.log(group+' szektor clicked!')
    this.szektorSzinezes(group);
  }

  helyszinSvgBetoltes(){

    this.helyszinSzerviz.helyszinSvgKepUrl(this.kivalasztottHelyszin.svg_kep_eleres).subscribe((valasz)=>{
        this.helyszinSvg =  valasz;
        this.renderer.setProperty(this.svgContainer.nativeElement, 'innerHTML', this.helyszinSvg);
        this.kivalasztottSzektorok.forEach(szektor => {
          const g:HTMLElement = this.svgContainer.nativeElement.querySelector('#'+szektor.id);
          this.renderer.listen(g, 'click', () => {
            this.clickEvent(g.id);
        });
      });
    }
  )}

  jegyKivalasztas(szektor:SzektorModell,szektorAlegyseg:SzektorAlegysegModell){
    this.kivalasztottSzektorAlegyseg = szektorAlegyseg;
    this.kivalasztottSzektor = szektor;
    this.jegyKivalasztas_e = false;
  }

  jegyKosarbaHelyezes(){
    this.kosarService.kosarbaHelyezes(new JegyAdatModell(
      this.kivalasztottEsemeny,
      this.kivalasztottSzektor,
      this.kivalasztottSzektorAlegyseg,
      this.kosarService.ulohelySzamGeneralas(this.jegyFoglaltDarab),
      this.jegyFoglaltDarab
    ));
    this.jegyInfoVisszaallitas();
    this.openSnackbar()
  }

  jegyInfoVisszaallitas(){
    this.jegyKivalasztas_e = true;
    this.jegyFoglaltDarab = 0;
  }

  szektorFoglaltsag(esemenyId:string){
    this.szektorAlegysegSzerviz.szektorAlegysegFoglaltsag(esemenyId).subscribe((valasz)=>{
      this.szektorFoglaltsagok = valasz;
    });
  }

  openSnackbar(){
    this._snackBar.open("Jegy kosárba helyezve!",'Mégse',{duration:2500}).onAction().subscribe(()=>{this.kosarService.jegyAdatLista.pop();});
  }
}