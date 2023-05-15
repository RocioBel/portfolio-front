import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  data:any;
  constructor(private portfolioServicio:PortfolioService) {}
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
}
