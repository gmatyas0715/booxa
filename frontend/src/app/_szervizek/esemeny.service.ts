import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EsemenyModell } from '../_modellek/esemeny-modell';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EsemenyService {

  constructor(private http: HttpClient) { 
  
  }

  apiUrl: string = 'http://localhost:8000/api/';


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

      return this.http.get<any[]>(this.apiUrl+'esemenyKereso',{params})
  }

  esemenyAdatok(esemenyId:string):Observable<EsemenyModell>{
    return this.http.get<EsemenyModell>(this.apiUrl+'esemenyek/'+esemenyId)
    .pipe(
      map((response: EsemenyModell) => {
        response.idopont = new Date(response.idopont);
        return response;
      })
    );
  }

  esemenyLetrehozas(userToken:string,esemenyAdatok: FormData):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })
    
    return this.http.post(this.apiUrl+'esemenyek',esemenyAdatok,{headers})
  }

  esemenyModositas(esemenyId:string,userToken:string,esemenyAdatok: FormData):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })

    return this.http.post(this.apiUrl+'esemenyek/'+esemenyId,esemenyAdatok,{headers});
  }
  
  esemenyTorles(esemenyId:number,userToken:string):Observable<any>{
    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userToken}`
    })
    return this.http.delete<any>(this.apiUrl+'esemenyek/'+esemenyId,{headers});
  }

  esemenyOsszes():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'esemenyek')
  }

  helyszinEloadoNevId():Observable<any>{
    return this.http.get<any>(this.apiUrl+'helyszin-eloado-nev-id')
  }
}
