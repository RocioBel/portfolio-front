import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url:string="https://portfolio-web-6893.onrender.com/";
  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any> {
    return this.http.get(this.url+'person/1');
  }
}
