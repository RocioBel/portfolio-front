import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url:string="https://portfolioweb-vargasrocio.b4a.run/";
  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any> {
    return this.http.get(this.url + 'person/1');
  }

  actualizarPersona(datos:any):Observable<any> {
    return this.http.put(this.url + 'person/1', datos);
  }

  actualizarExperiencia(idExperiencia:number, datos:any):Observable<any> {
    return this.http.put(this.url + 'person/1/experience/'+idExperiencia, datos);
  }

  agregarExperiencia(nuevaExperiencia:any):Observable<any> {
    return this.http.post(this.url + 'person/1/experience', nuevaExperiencia);
  }

  eliminarExperiencia(idExperiencia:number):Observable<any> {
    return this.http.delete(this.url + 'person/1/experience/' + idExperiencia);
  }


}
