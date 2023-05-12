import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  @Input() listado:any;
  @Input() nueva:any;
  seleccionIndex: number = -1
  modoAdicion = false;

  constructor(private portfolioServicio:PortfolioService){
    this.listado = [];
  }

  ngOnInit(): void {  }

  activarModoEdicion(index:any) {
    this.seleccionIndex = index;
  }

  activarModoAdicion() {
    this.modoAdicion = true;
    this.nueva = {}; 
  }

  guardar(cambios:any) {
    console.log("cambios: "+JSON.stringify(cambios));
    this.portfolioServicio.actualizarEducacion(cambios.educationId, cambios).subscribe(
      response => {
        console.log('Datos actualizados:', response);
      },
      error => {
        console.log("Error al actualizar datos:", error);
      }
    );
    this.seleccionIndex = -1;
  }

  agregar(educacion:any) {
    this.portfolioServicio.agregarEducacion(educacion).subscribe(
      response => {
        console.log('Datos agregados:', response);
        this.listado.push(educacion);
      },
      error => {
        console.log("Error al agregar datos:", error);
      }
    );

    this.modoAdicion = false;
    
  }


  eliminar(id:number) {
    console.log("componente:" + id);
    this.portfolioServicio.eliminarEducacion(id).subscribe(
      () => {
        this.listado = this.listado.filter((exp: any) => exp.educationId !== id);
      },
      error => {
        console.log("Error al eliminar datos:", error);
      })
  }
  
}
