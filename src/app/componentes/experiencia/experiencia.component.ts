import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciasComponent implements OnInit {
  @Input() experienciaList:any;
  @Input() nuevaExperiencia:any;
  experienciaSeleccionadaIndex: number = -1
  modoAdicion = false;
  tiposTrabajo = [
    { label: 'Jornada completa', value: '1' },
    { label: 'Jornada reducida', value: '2' },
    { label: 'Autónomo', value: '3' }
  ]
  constructor(private portfolioServicio:PortfolioService){
    this.experienciaList = [];
  }

  ngOnInit(): void {  }

  activarModoEdicion(index:any) {
    this.experienciaSeleccionadaIndex = index;
  }

  activarModoAdicion() {
    this.modoAdicion = true;
    this.nuevaExperiencia = {}; 
  }

  guardarCambios(cambios:any) {
    console.log("cambios: "+JSON.stringify(cambios));
    this.portfolioServicio.actualizarExperiencia(cambios.experienceId, cambios).subscribe(
      response => {
        console.log('Datos actualizados:', response);
      },
      error => {
        console.log("Error al actualizar datos:", error);
      }
    );
    this.experienciaSeleccionadaIndex = -1;
  }

  agregarExperiencia(experiencia:any) {
    this.portfolioServicio.agregarExperiencia(experiencia).subscribe(
      response => {
        console.log('Datos agregados:', response);
        this.experienciaList.push(experiencia);
      },
      error => {
        console.log("Error al agregar datos:", error);
      }
    );

    this.modoAdicion = false;
    
  }

  obtenerLabelTipoTrabajo(id: string): string {
    const tipoTrabajo = this.tiposTrabajo.find(tipo => tipo.value == id);
    return tipoTrabajo ? tipoTrabajo.label : '';
  }

  eliminarExperiencia(id:number) {
    console.log("componente:" + id);
    this.portfolioServicio.eliminarExperiencia(id).subscribe(
      () => {
        this.experienciaList = this.experienciaList.filter((exp: any) => exp.experienceId !== id);
      },
      error => {
        console.log("Error al eliminar experiencia:", error);
      })
  }
}
