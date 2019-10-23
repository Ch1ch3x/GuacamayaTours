import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material';

export interface UsersData {
  name: string;
  imagen: string;
  estado: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {
    id: 632,
    name: 'Tucacas',
    estado: 'Falcon',
    imagen: 'src/assets/img/Cayo.jpg',
  },
  {
    id: 614,
    name: 'Pampatar',
    estado: 'Nueva Esparta',
    imagen: 'src/assets/img/5011953823_19b9a06d1a_b.jpg',
  },
  {
    id: 815,
    name: 'Chichiriviche',
    estado: 'Falcon',
    imagen: 'src/assets/img/MargaritaCastle.jpg',
  }
];

@Component({
  selector: 'app-lista-ciudad',
  templateUrl: './lista-ciudad.component.html',
  styleUrls: ['./lista-ciudad.component.scss']
})
export class ListaCiudadComponent {
  displayedColumns: string[] = ['name', 'estado', 'imagen', 'id'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  formVisibility = false;

  constructor() { }

  openCrear() {
    this.formVisibility = true;
  }
  openBorrar() {
    this.formVisibility = false;
  }
}
