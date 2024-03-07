import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EloadoService {

  public apiUrl:string = 'http://localhost:8000/api/'
  
  constructor(private http:HttpClient){ }

  eloadoLetrehozas(userToken:string,eloadoAdatok: FormData):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })

    return this.http.post(this.apiUrl+'eloadok',eloadoAdatok,{headers})
  }

  eloadModositas(eloadoId:string,userToken:string,eloadoAdatok: FormData):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })

    return this.http.post(this.apiUrl+'eloadok/'+eloadoId,eloadoAdatok,{headers});
  }
  
  eloadoTorles(eloadoId:number,userToken:string):Observable<any>{
    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userToken}`
    })
    return this.http.delete<any>(this.apiUrl+'eloadok/'+eloadoId,{headers});
  }

  eloadokNevekLekerdezese():Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl+'eloado-nevek');
  } 
  
  eloadoKepUrl(kepNev: string): string{
    return 'http://localhost:8000/eloado-kep/'+kepNev;
  }

  eloadoOsszes():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'eloadok')
  }
}
