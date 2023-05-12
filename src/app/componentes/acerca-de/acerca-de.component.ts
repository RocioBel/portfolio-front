import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  @Input() data:any;
  modoEdicion = false;
  constructor(private portfolioServicio: PortfolioService){}

  ngOnInit(): void {  }

  activarModoEdicion() {
    this.modoEdicion = true;
  }

  guardarCambios(cambios:any) {
    console.log("cambios: "+JSON.stringify(cambios));
    this.portfolioServicio.actualizarPersona(cambios).subscribe(
      response => {
        console.log('Datos actualizados:', response);
      },
      error => {
        console.log("Error al actualizar datos:", error);
      }
    );
    this.modoEdicion = false;
  }
}


