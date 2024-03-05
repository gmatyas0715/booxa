import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CimService {

  public apiUrl:string = 'http://localhost:8000/api'

  constructor(private http:HttpClient) { }

  cimLetrehozas(userToken:string,cimAdatok: any):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userToken}`
    })

    return this.http.post(this.apiUrl+'/cimek',cimAdatok,{headers})
  }

  cimModositas(cimId:string,userToken:string,cimAdatok: any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userToken}`
    })

    return this.http.patch(this.apiUrl+'/cimek/'+cimId,cimAdatok,{headers});
  }
  
  cimTorles(cimId:number,userToken:string):Observable<any>{
    
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })

    return this.http.delete<any>(this.apiUrl+'/cimek/'+cimId,{headers});
  }

  cimOsszes():Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/cimek');
  } 

  helyszinCimekLekerdezese():Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl+'/helyszin-cimek');
  } 
}
