import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';


@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {
  @Input() listado:any;
  @Input() nuevo:any;
  seleccionIndex: number = -1
  modoAdicion = false;
  datosOriginales: any = [];

  niveles = [
    { label: 'Básico', value: '33.33' },
    { label: 'Intermedio', value: '66.66' },
    { label: 'Avanzado', value: '100' },
  ];

  constructor(private portfolioServicio:PortfolioService, private autenticacionService: AutenticacionService){
    this.listado = [];
  }

  ngOnInit(): void { 
    this.datosOriginales = [];
    this.portfolioServicio.obtenerIdiomas().subscribe(
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
    this.portfolioServicio.actualizarIdioma(cambios.languageId, cambios).subscribe(
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
    this.portfolioServicio.obtenerIdiomas().subscribe(
      (idiomas: any[]) => {
        this.listado = idiomas;
      },
      (error: any) => {
        console.error('Error al obtener el listado:', error);
      }
    );
  }

  obtenerLabel(id: string): string {
    const nivel = this.niveles.find((nivel) => nivel.value == id);
    return nivel ? nivel.label : '';
  }

  agregar(proyecto:any) {
    this.portfolioServicio.agregarIdioma(proyecto).subscribe(
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
    this.portfolioServicio.eliminarIdioma(id).subscribe(
      () => {
        this.listado = this.listado.filter((lang: any) => lang.languageId !== id);
      },
      error => {
        console.log("Error al eliminar datos:", error);
      })
  }

  estaAuntenticado(): boolean {
    return this.autenticacionService.IsAutenticado
  }
}
