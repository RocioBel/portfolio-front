import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  @Input() data:any;
  modoEdicion = false;
  constructor(private portfolioServicio: PortfolioService, private autenticacionService: AutenticacionService){}

  ngOnInit(): void {  }

  activarModoEdicion() {
    this.modoEdicion = true;
  }

  desactivarModoEdicion() {
    this.modoEdicion = false;
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

  estaAuntenticado(): boolean {
    return this.autenticacionService.IsAutenticado
  }
}


