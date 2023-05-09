import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {
  idiomaList:any;
  constructor(private datosPortfolio:PortfolioService){}

  ngOnInit(): void {
     this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.idiomaList=data.languages;
    })
  }
}
