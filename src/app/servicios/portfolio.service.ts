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

  obtenerExperiencias():Observable<any> {
    return this.http.get(this.url + 'person/1/experience')
  }

  agregarExperiencia(nuevaExperiencia:any):Observable<any> {
    return this.http.post(this.url + 'person/1/experience', nuevaExperiencia);
  }

  eliminarExperiencia(idExperiencia:number):Observable<any> {
    return this.http.delete(this.url + 'person/1/experience/' + idExperiencia);
  }

  obtenerEducacion():Observable<any> {
    return this.http.get(this.url + 'person/1/education')
  }

  actualizarEducacion(idEducacion:number, datos:any):Observable<any> {
    return this.http.put(this.url + 'person/1/education/'+idEducacion, datos);
  }

  agregarEducacion(nuevaEducacion:any):Observable<any> {
    return this.http.post(this.url + 'person/1/education', nuevaEducacion);
  }

  eliminarEducacion(idEducacion:number):Observable<any> {
    return this.http.delete(this.url + 'person/1/education/' + idEducacion);
  }

  obtenerProyectos():Observable<any> {
    return this.http.get(this.url + 'person/1/project')
  }

  actualizarProyecto(idProject:number, datos:any):Observable<any> {
    return this.http.put(this.url + 'person/1/project/'+idProject, datos);
  }

  agregarProyecto(nuevoProject:any):Observable<any> {
    return this.http.post(this.url + 'person/1/project', nuevoProject);
  }

  eliminarProyecto(idProject:number):Observable<any> {
    return this.http.delete(this.url + 'person/1/project/' + idProject);
  }

  obtenerIdiomas():Observable<any> {
    return this.http.get(this.url + 'person/1/language')
  }

  actualizarIdioma(idIdioma:number, datos:any):Observable<any> {
    return this.http.put(this.url + 'person/1/language/'+idIdioma, datos);
  }

  agregarIdioma(nuevoIdioma:any):Observable<any> {
    return this.http.post(this.url + 'person/1/language', nuevoIdioma);
  }

  eliminarIdioma(idIdioma:number):Observable<any> {
    return this.http.delete(this.url + 'person/1/language/' + idIdioma);
  }

  obtenerSkills():Observable<any> {
    return this.http.get(this.url + 'person/1/skill')
  }

  actualizarSkill(idSkill:number, datos:any):Observable<any> {
    return this.http.put(this.url + 'person/1/skill/'+idSkill, datos);
  }

  agregarSkill(nuevoSkill:any):Observable<any> {
    return this.http.post(this.url + 'person/1/skill', nuevoSkill);
  }

  eliminarSkill(idSkill:number):Observable<any> {
    return this.http.delete(this.url + 'person/1/skill/' + idSkill);
  }
}
