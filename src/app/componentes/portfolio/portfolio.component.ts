import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  data:any;
  constructor(private datosPortfolio:PortfolioService){}

  ngOnInit(): void {
     this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.data=data;
    })
  }
}
