import { Component, OnInit } from '@angular/core';
import destinos from '../../../../data/destinos.json';

@Component({
  selector: 'app-actualizar-destinos-turisticos',
  templateUrl: './actualizar-destinos-turisticos.component.html',
  styleUrls: ['./actualizar-destinos-turisticos.component.scss']
})
export class ActualizarDestinosTuristicosComponent implements OnInit {

  destinos = [];
  

  constructor() { }

  ngOnInit() {
  }

}
