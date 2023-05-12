import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


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

  constructor(private portfolioServicio:PortfolioService){
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
    this.portfolioServicio.actualizarIdioma(cambios.languageId, cambios).subscribe(
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
}
