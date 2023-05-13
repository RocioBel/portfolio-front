import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  @Input() listado:any;
  @Input() nuevo:any;
  seleccionIndex: number = -1
  modoAdicion = false;

  niveles = [
    { label: 'Básico', value: '33.33' },
    { label: 'Intermedio', value: '66.66' },
    { label: 'Avanzado', value: '100' },
  ];

  constructor(private portfolioServicio:PortfolioService, private autenticacionService: AutenticacionService){
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
    this.portfolioServicio.actualizarSkill(cambios.skillId, cambios).subscribe(
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
    this.portfolioServicio.obtenerSkills().subscribe(
      (skills: any[]) => {
        this.listado = skills;
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
    this.portfolioServicio.agregarSkill(proyecto).subscribe(
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
    this.portfolioServicio.eliminarSkill(id).subscribe(
      () => {
        this.listado = this.listado.filter((skill: any) => skill.skillId !== id);
      },
      error => {
        console.log("Error al eliminar datos:", error);
      })
  }

  estaAuntenticado(): boolean {
    return this.autenticacionService.IsAutenticado
  }

 
}
