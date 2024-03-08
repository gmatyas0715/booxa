import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelyszinService {
  apiUrl: string = 'http://localhost:8000/api/';


  constructor(private http:HttpClient){ }

  helyszinNevekLekerdezese():Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl+'helyszin-nevek');
  } 

  helyszinKepUrl(kepNev: string): string{
    return 'http://localhost:8000/helyszin-kep/'+kepNev;
  }

  helyszinSvgKepUrl(kepNev: string){
    return this.http.get('http://localhost:8000/svg-helyszin-kep/'+kepNev, { responseType: 'text'});
  }

  helyszinSvgKep(kepNev: string){
    return 'http://localhost:8000/svg-helyszin-kep/'+kepNev;
  }

  helyszinLetrehozas(userToken:string,helyszinAdatok: FormData):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })
    
    return this.http.post(this.apiUrl+'helyszinek',helyszinAdatok,{headers})
  }

  helyszinModositas(eloadoId:string,userToken:string,helyszinAdatok: FormData):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })

    return this.http.post(this.apiUrl+'helyszinek/'+eloadoId,helyszinAdatok,{headers});
  }
  
  helyszinTorles(eloadoId:number,userToken:string):Observable<any>{
    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userToken}`
    })
    return this.http.delete<any>(this.apiUrl+'helyszinek/'+eloadoId,{headers});
  }
  
  helyszinOsszes():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'helyszinek')
  }
}
