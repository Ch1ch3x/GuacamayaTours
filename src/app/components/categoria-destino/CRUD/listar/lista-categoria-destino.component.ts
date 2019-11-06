import { tipoDeDestino } from './../../../../interfaces/tipo-de-destinos';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import tipos from '../../../../data/tipos.json';

const ELEMENT_DATA: tipoDeDestino[] = tipos;

@Component({
  selector: 'app-lista-categoria-destino',
  templateUrl: './lista-categoria-destino.component.html',
  styleUrls: ['./lista-categoria-destino.component.scss']
})
export class ListaCategoriaDestinoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'id'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,  { static: true}) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
  selectedRowIndex: number = -1;


  constructor() { }
  public tipo = tipos;
  public tipos: tipoDeDestino[] = [];
  public Tipo: tipoDeDestino = {
    id: this.tipo.length,
    nombre: "",
    foto: "",
    deshabilitar: false
  }

  ngOnInit() {
    this.tipo = tipos;
  }

  clearEstado() {
    this.Tipo = {
      nombre: "",
      foto: "",
      id: this.tipo.length + 1,
      deshabilitar: false
    };
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
  }

  crearCategoria() {
    this.addRowData();
    this.formVisibility = false;
    this.crearformVisibility = false;
  }

  addRowData() {
    tipos.push(this.Tipo);
    this.clearEstado();
    this.table.renderRows();
  }

  modifyRowData() {
    this.table.renderRows();
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
    this.Tipo = this.tipo[this.selectedRowIndex];
  }

  close() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  modificar() {
    this.tipo[this.selectedRowIndex].nombre = this.Tipo.nombre;
    this.tipo[this.selectedRowIndex].foto = this.Tipo.foto;
  }

  modificarCategoria() {
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
    tipos[this.selectedRowIndex].deshabilitar = true;
  }
  habilitar() {
    tipos[this.selectedRowIndex].deshabilitar = false;
  }
}
