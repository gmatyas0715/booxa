import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MufajService {

  public apiUrl:string = 'http://localhost:8000/api'
  public mufajLista:string[] = []

  constructor(private http:HttpClient) { }

  mufajokLekerdezese():Observable<any>{
    return this.http.get<string[]>(this.apiUrl+'/mufaj-nevek')
  }

  mufajOsszes(userToken:string):Observable<any[]>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })
    return this.http.get<any[]>(this.apiUrl+'/mufajok',{headers})
  }

  mufajLetrehozas(userToken:string,mufajAdatok: any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userToken}`
    })

    const body = JSON.stringify(mufajAdatok);

    return this.http.post(this.apiUrl+'/mufajok',body,{headers})
  }

  mufajModositas(mufajId:string,userToken:string,mufajAdatok: any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${userToken}`
    })

    const body = {mufajAdatok}
    return this.http.patch<any>(this.apiUrl+'/mufajok/'+mufajId,body,{headers});
  }

  mufajTorles(mufajId:string,userToken:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${userToken}`
    })
    return this.http.delete<any>(this.apiUrl+'/mufajok/'+mufajId,{headers});
  }
}
