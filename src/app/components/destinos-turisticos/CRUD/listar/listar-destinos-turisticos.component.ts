import { Component, ViewChild, OnInit } from '@angular/core';

import { MatTable } from '@angular/material';

import destinos from '../../../../data/destinos.json';
import { destinoTuristico } from '../../../../interfaces/destinoTuristico';

const ELEMENT_DATA: destinoTuristico[] = destinos;
@Component({
  selector: 'app-listar-destinos-turisticos',
  templateUrl: './listar-destinos-turisticos.component.html',
  styleUrls: ['./listar-destinos-turisticos.component.scss']
})
export class ListarDestinosTuristicosComponent implements OnInit {

  constructor() {}
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = [
    'nombre',
    'estado',
    'ciudad',
    'tipo',
    'actividades',
    'servicios',
    'latitud',
    'longitud',
    'direccion',
    'descripcion',
    'id'
  ];
  dataSource = ELEMENT_DATA;

  public destino = destinos;
  public destinos: destinoTuristico[] = [];
  public Destino: destinoTuristico = {
    nombre: '',
    tipo: '',
    servicios: '',
    actividades: '',
    ciudad: '',
    latitud: '',
    longitud: '',
    direccion: '',
    descripcion: '',
    estado: '',
    id: this.destino.length + 1,
    deshabilitar: false
  };

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  selectedRowIndex: number = -1;

  ngOnInit() {
    this.destino = destinos;
  }

  clearDestino() {
    this.Destino = {
      nombre: '',
      tipo: '',
      servicios: '',
      actividades: '',
      ciudad: '',
      latitud: '',
      longitud: '',
      direccion: '',
      descripcion: '',
      estado: '',
      id: this.destino.length + 1,
      deshabilitar: false
    };
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
  }

  crearDestinos() {
    this.addRowData();
    this.formVisibility = false;
    this.crearformVisibility = false;
  }

  addRowData() {
    destinos.push(this.Destino);
    this.clearDestino();
    this.table.renderRows();
  }

  modifyRowData() {
    destinos.push(this.Destino);
    this.clearDestino();
    this.table.renderRows();
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
  }

  modificarDestinos() {
    this.modifyRowData();
    this.formVisibility = false;
    this.crearformVisibility = false;
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  deshabilitar() {
    destinos[this.selectedRowIndex].deshabilitar = true;
  }
  habilitar() {
    destinos[this.selectedRowIndex].deshabilitar = false;
  }
}
