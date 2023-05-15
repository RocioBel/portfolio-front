import { Component } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { RouterModule } from '@angular/router';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  data:any;
  constructor(private autenticacionService: AutenticacionService, 
    private router:RouterModule, private portfolioServicio:PortfolioService) {}

  ngOnInit(): void {
    this.portfolioServicio.obtenerDatos().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.log('Error al obtener datos:', error);
      }
    );
  }

  cerrarSesion() {
    this.autenticacionService.CerrarSesion();
  }

  estaAuntenticado(): boolean {
    return this.autenticacionService.IsAutenticado
  }
}
