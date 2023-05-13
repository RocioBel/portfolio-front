import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  @Input() listado:any;
  @Input() nuevo:any;
  seleccionIndex: number = -1
  modoAdicion = false;

  constructor(private portfolioServicio:PortfolioService, private autenticacionService: AutenticacionService){
    this.listado = [];
  }

  ngOnInit(): void {  }

  activarModoEdicion(index:any) {
    this.seleccionIndex = index;
  }

  activarModoAdicion() {
    this.modoAdicion = true;
    this.nuevo = {}; 
  }

  guardar(cambios:any) {
    console.log("cambios: "+JSON.stringify(cambios));
    this.portfolioServicio.actualizarProyecto(cambios.projectId, cambios).subscribe(
      response => {
        console.log('Datos actualizados:', response);
      },
      error => {
        console.log("Error al actualizar datos:", error);
      }
    );
    this.seleccionIndex = -1;
  }

  agregar(proyecto:any) {
    this.portfolioServicio.agregarProyecto(proyecto).subscribe(
      response => {
        console.log('Datos agregados:', response);
        this.listado.push(proyecto);
      },
      error => {
        console.log("Error al agregar datos:", error);
      }
    );

    this.modoAdicion = false;
    
  }


  eliminar(id:number) {
    console.log("componente:" + id);
    this.portfolioServicio.eliminarProyecto(id).subscribe(
      () => {
        this.listado = this.listado.filter((exp: any) => exp.projectId !== id);
      },
      error => {
        console.log("Error al eliminar datos:", error);
      })
  }

  estaAuntenticado(): boolean {
    return this.autenticacionService.IsAutenticado
  }
}
