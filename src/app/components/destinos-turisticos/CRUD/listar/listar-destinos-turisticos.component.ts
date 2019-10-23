import { Component, ViewChild, OnInit } from '@angular/core';

import { MatTable } from '@angular/material';

import destinos from '../../../../data/destinos.json';
import {destinoTuristico} from '../../../../interfaces/destinoTuristico';
import { SelectionModel } from '@angular/cdk/collections';

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
    id: this.destino.length + 1,
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
    this.destino.push({ ...this.Destino });
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

  checkboxLabel(row?: destinoTuristico): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }
}
