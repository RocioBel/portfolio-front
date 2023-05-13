import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciasComponent implements OnInit {
  @Input() listado: any;
  @Input() nueva: any;
  seleccionIndex: number = -1;
  modoAdicion = false;
  tiposTrabajo = [
    { label: 'Jornada completa', value: '1' },
    { label: 'Jornada reducida', value: '2' },
    { label: 'Autónomo', value: '3' },
  ];
  constructor(private portfolioServicio: PortfolioService, private autenticacionService: AutenticacionService  ) {
    this.listado = [];
  }

  ngOnInit(): void {}

  activarModoEdicion(index: any) {
    this.seleccionIndex = index;
  }

  activarModoAdicion() {
    this.modoAdicion = true;
    this.nueva = {};
  }

  guardar(cambios: any) {
    console.log('cambios: ' + JSON.stringify(cambios));
    this.portfolioServicio
      .actualizarExperiencia(cambios.experienceId, cambios)
      .subscribe(
        (response) => {
          console.log('Datos actualizados:', response);
        },
        (error) => {
          console.log('Error al actualizar datos:', error);
        }
      );
    this.seleccionIndex = -1;

    setTimeout(() => {
      this.actualizarListado();
    }, 5000);
  }

  actualizarListado() {
    this.portfolioServicio.obtenerExperiencias().subscribe(
      (experiencias: any[]) => {
        this.listado = experiencias;
      },
      (error: any) => {
        console.error('Error al obtener las experiencias:', error);
      }
    );
  }

  agregar(experiencia: any) {
    this.portfolioServicio.agregarExperiencia(experiencia).subscribe(
      (response) => {
        console.log('Datos agregados:', response);
        this.listado.push(experiencia);
      },
      (error) => {
        console.log('Error al agregar datos:', error);
      }
    );

    this.modoAdicion = false;

    setTimeout(() => {
      this.actualizarListado();
    }, 3000);
  }

  obtenerLabelTipoTrabajo(id: string): string {
    const tipoTrabajo = this.tiposTrabajo.find((tipo) => tipo.value == id);
    return tipoTrabajo ? tipoTrabajo.label : '';
  }

  eliminar(id: number) {
    console.log('componente:' + id);
    this.portfolioServicio.eliminarExperiencia(id).subscribe(
      () => {
        this.listado = this.listado.filter(
          (exp: any) => exp.experienceId !== id
        );
      },
      (error) => {
        console.log('Error al eliminar:', error);
      }
    );
  }

  reiniciarFecha(experiencia: any): string {
    experiencia.endDate = null;
    return experiencia;
  }

  estaAuntenticado(): boolean {
    return this.autenticacionService.IsAutenticado
  }
}
