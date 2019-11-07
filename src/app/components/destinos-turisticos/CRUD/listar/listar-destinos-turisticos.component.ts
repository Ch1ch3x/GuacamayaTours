import { Component, ViewChild, OnInit } from '@angular/core';

import { MatTable } from '@angular/material';

import destinos from '../../../../data/destinos.json';
import tipos from '../../../../data/tipos.json';
import ciudades from '../../../../data/ciudades.json';
import estados from '../../../../data/estados.json';
import { destinoTuristico } from '../../../../interfaces/destinoTuristico';
import { tipo } from '../../../../interfaces/tipo';
import { ciudad } from '../../../../interfaces/ciudad';
import { estado } from '../../../../interfaces/estado';

const ELEMENT_DATA: destinoTuristico[] = destinos;


@Component({
  selector: 'app-listar-destinos-turisticos',
  templateUrl: './listar-destinos-turisticos.component.html',
  styleUrls: ['./listar-destinos-turisticos.component.scss']
})
export class ListarDestinosTuristicosComponent implements OnInit {
  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
  validacion = true;
  valnombre = true;
  valtipo = true;
  valservicios = true;
  valactividades = true;
  valciudad = true;
  vallatitud = true;
  vallongitud = true;
  valdireccion = true;
  valdescripcion = true;
  valestado = true;
  selecttipo: string = '0';
  selectestado: string = '0';
  selectciudad: string = '0';
  vertipo: string = '0';
  verestado: string = '0';
  verciudad: string = '0';
  dataSource = ELEMENT_DATA;
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

  public destino = destinos;
  public tipoD = tipos;
  public ciudadD = ciudades;
  public estadoD = estados;
  public destinos: destinoTuristico[] = [];
  public Destino: destinoTuristico = {
    nombre: '',
    tipo: [this.tipoD[this.vertipo].nombre],
    servicios: '',
    actividades: '',
    ciudad: [this.ciudadD[this.verciudad].nombre],
    latitud: '',
    longitud: '',
    direccion: '',
    descripcion: '',
    estado: [this.estadoD[this.verestado].nombre],
    id: this.destino.length + 1,
    deshabilitar: false
  };

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;



  selectedRowIndex: number = -1;

  ngOnInit() {
    this.destino = destinos;
  }

  clearDestino() {
    this.Destino = {
      nombre: '',
      tipo: [''],
      servicios: '',
      actividades: '',
      ciudad: [''],
      latitud: '',
      longitud: '',
      direccion: '',
      descripcion: '',
      estado: [''],
      id: this.destino.length + 1,
      deshabilitar: false
    };
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
  }

  crearDestinos() {
    if (this.validacion == true) {
      if (this.Destino.nombre == "") {
        this.validacion = false;
        this.valnombre = false;
      }
      if (this.Destino.servicios == "") {
        this.validacion = false;
        this.valservicios = false;
      }
      if (this.Destino.actividades == "") {
        this.validacion = false;
        this.valactividades = false;
      }
      if (this.Destino.descripcion == "") {
        this.validacion = false;
        this.valdescripcion = false;
      }
      if (this.Destino.direccion == "") {
        this.validacion = false;
        this.valdireccion = false;
      }
      if (this.Destino.latitud == "") {
        this.validacion = false;
        this.vallatitud = false;
      }
      if (this.Destino.longitud == "") {
        this.validacion = false;
        this.vallongitud = false;
      }
      if (this.verciudad == "") {
        this.validacion = false;
        this.valciudad = false;
      }
      if (this.verestado == "") {
        this.validacion = false;
        this.valestado = false;
      }
      if (this.vertipo == "") {
        this.validacion = false;
        this.valtipo = false;
      }
      this.openCrear();
    }else{
      this.addRowData();
      this.formVisibility = false;
      this.crearformVisibility = false;
    }
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
    this.validacion = true;
    this.valnombre = true;
    this.valtipo = true;
    this.valservicios = true;
    this.valactividades = true;
    this.valciudad = true;
    this.vallatitud = true;
    this.vallongitud = true;
    this.valdireccion = true;
    this.valdescripcion = true;
    this.valestado = true;
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

  capturarTipo() {
    this.vertipo = this.selecttipo;
  }
  capturarEstado() {
    this.verestado = this.selectestado;
  }
  capturarCiudad() {
    this.verciudad = this.selectciudad;
  }
};