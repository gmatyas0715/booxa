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

  eloadoAdatok(eloado:string,helyszin:string):Observable<EsemenyModell[]>{
    console.log(eloado,' ',helyszin)
    const params = new HttpParams()
      .set('eloado',eloado)
      .set('helyszin',helyszin);

      console.log(params);

      return this.http.get<EsemenyModell[]>('http://localhost:8000/api/esemenyKereso',{params})
      .pipe(
        map((responseArray: EsemenyModell[]) => {
          // Convert string dates to Date objects for each element in the array
          return responseArray.map((item: EsemenyModell) => {
            item.idopont = new Date(item.idopont);
            return item;
          });
        })
      );
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
