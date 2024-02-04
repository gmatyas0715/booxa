import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EsemenyModell } from '../_modellek/esemeny-modell';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EsemenyService {

  constructor(
    private http: HttpClient,
  ) { 
  
  }

  kivalasztottEsemeny: any;

  esemenyKivalasztas(valasztottEsemeny:EsemenyModell){
    this.kivalasztottEsemeny = valasztottEsemeny
  }

  esemenyKereses(eloado:string,
                 helyszin:string,
                 datum:string,
                 keresettTelepulesek:string,
                 keresettMufajok:string,
                 minJegyar:number,
                 maxJegyar:number):Observable<any[]>{

    console.log(eloado+" "+helyszin+" "+datum+" "+keresettTelepulesek+" "+keresettMufajok+" "+minJegyar+" "+maxJegyar+" ")
    let params = new HttpParams();

    if (eloado!="") params = params.set('eloado',eloado)
    if (helyszin!="") params = params.set('helyszin',helyszin)
    if (datum!="") params = params.set('datum',datum)
    if (keresettTelepulesek!="") params = params.set('keresett-telepulesek',keresettTelepulesek)
    if (keresettMufajok!="") params = params.set('keresett-mufajok',keresettMufajok)

    params = params.set('min-jegyar',minJegyar)
    params = params.set('max-jegyar',maxJegyar)

    console.log(params)

      return this.http.get<any[]>('http://localhost:8000/api/esemenyKereso',{params})
  }

  esemenyAdatok(esemenyId:string):Observable<EsemenyModell>{
    return this.http.get<EsemenyModell>('http://localhost:8000/api/esemenyek/'+esemenyId)
    .pipe(
      map((response: EsemenyModell) => {
        response.idopont = new Date(response.idopont);
        return response;
      })
    );
  }
}
