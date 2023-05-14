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
  datosOriginales: any = [];

  constructor(private portfolioServicio:PortfolioService, private autenticacionService: AutenticacionService){
    this.listado = [];
  }

  ngOnInit(): void { 
    this.datosOriginales = [];
    this.portfolioServicio.obtenerProyectos().subscribe(
      (response) => {
        this.datosOriginales = response;
        console.log(this.datosOriginales);
      },
      (error) => {
        console.log('Error al obtener datos:', error);
      }
    );
   }

  activarModoEdicion(index:any) {
    this.seleccionIndex = index;
  }

  desactivarModoEdicion() {
    this.seleccionIndex = -1;
    this.listado = this.datosOriginales ;
  }

  activarModoAdicion() {
    this.modoAdicion = true;
    this.nuevo = {}; 
  }

  desactivarModoAdicion() {
    this.modoAdicion = false;
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

    setTimeout(() => {
      this.actualizarListado();
    }, 5000);
  }

  actualizarListado() {
    this.portfolioServicio.obtenerProyectos().subscribe(
      (proyectos: any[]) => {
        this.listado = proyectos;
      },
      (error: any) => {
        console.error('Error al obtener el listado:', error);
      }
    );
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

    setTimeout(() => {
      this.actualizarListado();
    }, 3000);
    
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
