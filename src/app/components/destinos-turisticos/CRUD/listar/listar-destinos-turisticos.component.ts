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
    this.table.renderRows();
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
    this.Destino = this.destino[this.selectedRowIndex];
  }

  close() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  modificar() {
    this.destino[this.selectedRowIndex].nombre = this.Destino.nombre;
    this.destino[this.selectedRowIndex].estado = this.Destino.estado;
    this.destino[this.selectedRowIndex].ciudad = this.Destino.ciudad;
    this.destino[this.selectedRowIndex].tipo = this.Destino.tipo;
    this.destino[this.selectedRowIndex].actividades = this.Destino.actividades;
    this.destino[this.selectedRowIndex].servicios = this.Destino.servicios;
    this.destino[this.selectedRowIndex].latitud = this.Destino.latitud;
    this.destino[this.selectedRowIndex].longitud = this.Destino.longitud;
    this.destino[this.selectedRowIndex].direccion = this.Destino.direccion;
    this.destino[this.selectedRowIndex].descripcion = this.Destino.descripcion;
  }

  modificarDestinos() {
    this.modifyRowData();
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
    console.log(this.selectedRowIndex, "hola");
    this.modificar();
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
