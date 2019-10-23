import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material';

import destinos from '../../../../data/destinos.json';

export interface UsersData {
  name: string;
  tipo: string;
  servicios: string;
  actividades: string;
  latitud: string;
  longitud: string;
  direccion: string;
  description: string;
  estado: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = destinos;



@Component({
  selector: 'app-listar-destinos-turisticos',
  templateUrl: './listar-destinos-turisticos.component.html',
  styleUrls: ['./listar-destinos-turisticos.component.scss']
})

export class ListarDestinosTuristicosComponent {
  displayedColumns: string[] = ['name', 'estado', 'tipo', 'actividades', 'servicios', 'latitud', 'longitud', 'direccion', 'description', 'id'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;

  constructor() {
    
   }
   

   public destino = destinos;

   ngOnInit() {
     this.destino = destinos;
   }

  openCrear() {
    this.formVisibility = true;
  }
  openBorrar() {
    this.formVisibility = false;
  }

}
