import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material';

import destinos from '../../../../data/destinos.json';
import {destinoTuristico} from '../../../../interfaces/destinoTuristico';

const ELEMENT_DATA: destinoTuristico[] = destinos;
@Component({
  selector: 'app-listar-destinos-turisticos',
  templateUrl: './listar-destinos-turisticos.component.html',
  styleUrls: ['./listar-destinos-turisticos.component.scss']
})

export class ListarDestinosTuristicosComponent {
  displayedColumns: string[] = ['nombre', 'estado', 'ciudad', 'tipo', 'actividades', 'servicios', 'latitud', 'longitud', 'direccion', 'descripcion', 'id'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;

  constructor() {
    
   }
  total = 2;
  nombre = "";
  tipo = 0;
  servicios = "";
  actividades = "";
  ciudad = "";
  latitud = "";
  longitud = "";
  direccion = "";
  descripcion = "";
  estado = "";
  id = 3;

  public destino = destinos;

   ngOnInit() {
     this.destino = destinos;
   }

  openCrear() {
    this.formVisibility = true;
  }

  crearDestinos() {
    this.formVisibility = false;

    destinos[this.total + 1].id = this.id;
    destinos[this.total].nombre = this.nombre;
    destinos[this.total].descripcion = this.descripcion;
    if (this.tipo == 1) {
      destinos[this.total].servicios = "Playa";
    } else if (this.tipo == 2) {
      destinos[this.total].servicios = "Montaña";
    } else {
      destinos[this.total].servicios = "Arte";
    }
    destinos[this.total].servicios = this.servicios;
    destinos[this.total].actividades = this.actividades;
    destinos[this.total].latitud = this.latitud;
    destinos[this.total].longitud = this.longitud;
    destinos[this.total].estado = this.estado;
    destinos[this.total].ciudad = this.ciudad;
    destinos[this.total].direccion = this.direccion;
  }

}
