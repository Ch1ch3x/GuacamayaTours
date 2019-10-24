import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material';

import ciudades from "../../../../data/ciudades.json";
import { ciudad } from "../../../../interfaces/ciudad";

const ELEMENT_DATA: ciudad[] = ciudades;

@Component({
  selector: 'app-lista-ciudad',
  templateUrl: './lista-ciudad.component.html',
  styleUrls: ['./lista-ciudad.component.scss']
})
export class ListaCiudadComponent {
  constructor() {}
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = [
    'nombre',
    'estado',
    'servicios',
    'imagen',
  ];
  dataSource = ELEMENT_DATA;

  public ciudad = ciudades;
  public ciudades: ciudades[] = [];
  public Destino: ciudades = {
    ciudadId: this.ciudad.length + 1,
    nombre: '',
    servicios: '',
    estado: '',
    imagen: '', 
    deshabilitar: false
  };

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  selectedRowIndex: number = -1;

  ngOnInit() {
    this.ciudad = ciudades;
  }

  clearCiudad() {
    this.ciudad = {
      ciudadId: this.ciudad.length + 1,
      nombre: '',
      servicios: '',
      estado: '',
      imagen: '', 
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
    ciudad.push(this.ciudad);
    this.clearCiudad();
    this.table.renderRows();
  }

  modifyRowData() {
    this.table.renderRows();
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
    this.ciudad = this.ciudad[this.selectedRowIndex];
  }

  close() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  modificar() {
    this.ciudad[this.selectedRowIndex].nombre = this.ciudad.nombre;
    this.ciudad[this.selectedRowIndex].id = this.ciudad.estado;
    this.ciudad[this.selectedRowIndex].estado = this.ciudad.ciudad;
    this.ciudad[this.selectedRowIndex].imagen = this.ciudad.tipo;
    this.ciudad[this.selectedRowIndex].actividades = this.Destino.actividades;
    
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
    ciudades[this.selectedRowIndex].deshabilitar = true;
  }
  habilitar() {
    ciudades[this.selectedRowIndex].deshabilitar = false;
  }
  
}
