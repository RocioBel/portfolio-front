import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  @Input() educacionList: any[];
  constructor(){
    this.educacionList = [];
  }

  ngOnInit(): void {}
  
}
