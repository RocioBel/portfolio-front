import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciasComponent implements OnInit {
  @Input() experienciaList:any;
  constructor(){
    this.experienciaList = [];
  }

  ngOnInit(): void {  }
}
