import { Component, ViewChild, OnInit } from '@angular/core';

import { MatTable } from '@angular/material';

import destinos from '../../../../data/destinos.json';
import {destinoTuristico} from '../../../../interfaces/destinoTuristico';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';

const ELEMENT_DATA: destinoTuristico[] = destinos;
@Component({
  selector: 'app-listar-destinos-turisticos',
  templateUrl: './listar-destinos-turisticos.component.html',
  styleUrls: ['./listar-destinos-turisticos.component.scss']
})

export class ListarDestinosTuristicosComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['select', 'nombre', 'estado', 'ciudad', 'tipo', 'actividades', 'servicios', 'latitud', 'longitud', 'direccion', 'descripcion', 'id'];
  dataSource = ELEMENT_DATA;

  selection = new SelectionModel<destinoTuristico>(false, []);

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
    id: this.destino.length,
  };

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  constructor() { }

  ngOnInit() {
     this.destino = destinos;
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
    this.destino.push({ ...this.Destino });
    this.table.renderRows();
  }

  modifyRowData() {
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
    this.modificarformVisibility = false;
    console.log(this.selectedRowIndex, "hola");
    this.modificar();
  }

  checkboxLabel(row?: destinoTuristico): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  } 

  close(){
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
    console.log(this.selectedRowIndex , "hola");
  }

  modificar() {
    this.destino[this.selectedRowIndex].nombre = "";
    this.destino[this.selectedRowIndex].estado = "";
    this.destino[this.selectedRowIndex].ciudad = "";
    this.destino[this.selectedRowIndex].tipo = "";
    this.destino[this.selectedRowIndex].actividades = "";
    this.destino[this.selectedRowIndex].servicios = "";
    this.destino[this.selectedRowIndex].latitud = "";
    this.destino[this.selectedRowIndex].longitud = "";
    this.destino[this.selectedRowIndex].direccion = "";
    this.destino[this.selectedRowIndex].descripcion = "";
  }

  selectedRowIndex: number= -1;

  highLight(row) {
    this.selectedRowIndex = row.id;
  }

  deshabilitar() {
    this.selectedRowIndex;
  }
};