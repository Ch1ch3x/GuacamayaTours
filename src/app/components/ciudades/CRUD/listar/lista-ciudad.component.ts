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
    'imagen',
  ];
  dataSource = ELEMENT_DATA;

  public ciudad = ciudades;
  public ciudades: ciudad[] = [];
  public Ciudad: ciudad = {
    id: this.ciudad.length,
    nombre: '',
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
    this.Ciudad = {
      nombre: '',
      estado: '',
      imagen: '',
      deshabilitar: false,
      id: this.ciudad.length,
    };
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
  }

  crearCiudad() {
    this.addRowData();
    this.formVisibility = false;
    this.crearformVisibility = false;
  }

  addRowData() {
    ciudades.push(this.Ciudad);
    this.clearCiudad();
    this.table.renderRows();
  }

  modifyRowData() {
    this.table.renderRows();
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
    this.Ciudad = this.ciudad[this.selectedRowIndex];
  }

  close() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  modificar() {
    this.ciudad[this.selectedRowIndex].nombre = this.Ciudad.nombre;
    this.ciudad[this.selectedRowIndex].estado = this.Ciudad.estado;
    this.ciudad[this.selectedRowIndex].imagen = this.Ciudad.imagen;

  }

  modificarCiudad() {
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
    ciudades[this.selectedRowIndex].deshabilitar = true;
  }
  habilitar() {
    ciudades[this.selectedRowIndex].deshabilitar = false;
  }

}
