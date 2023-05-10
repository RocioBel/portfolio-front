import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {
  @Input() idiomaList:any[];
  constructor(){
    this.idiomaList = [];
  }

  ngOnInit(): void {}
}
