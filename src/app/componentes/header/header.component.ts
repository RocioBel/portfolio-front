import { Component } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private autenticacionService: AutenticacionService, private router:RouterModule) {}

  cerrarSesion() {
    this.autenticacionService.CerrarSesion();
  }

  estaAuntenticado(): boolean {
    return this.autenticacionService.IsAutenticado
  }
}
