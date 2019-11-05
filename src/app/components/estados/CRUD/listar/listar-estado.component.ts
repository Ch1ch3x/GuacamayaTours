import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";

import estados from "../../../../data/estados.json";
import { estado } from "../../../../interfaces/estado";
import {EstadosService} from "../../../../services/firebase/estados.service"

const ELEMENT_DATA: estado[] = estados;

@Component({
  selector: "app-listar-estado",
  templateUrl: "./listar-estado.component.html",
  styleUrls: ["./listar-estado.component.scss"]
})
export class ListarEstadoComponent implements OnInit {
  displayedColumns: string[] = ["nombre", "id"] ;
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  formVisibility = false;
  estado = [];

  constructor(private EstadoSV: EstadosService) {
    this.EstadoSV.getAll().subscribe((estadoSnapshot))
  }


  selectedRowIndex: number = -1;

  

  ngOnInit() {
  }

  clearEstado() {
  }

  openCrear() {
  }

  crearEstado() {
    this.addRowData();
    this.formVisibility = false;
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  deshabilitar() {
    estados[this.selectedRowIndex].deshabilitar = true;
  }
  habilitar() {
    estados[this.selectedRowIndex].deshabilitar = false;
  }

  addRowData() {
    estados.push(this.Estado);
    this.clearEstado();
    this.table.renderRows();
  }

  modifyRowData() {
    estados.push(this.Estado);
    this.clearEstado();
    this.table.renderRows();
  }

  openModificar() {
    this.formVisibility = true;
  }

  modificarEstado() {
    this.modifyRowData();
    this.formVisibility = false;
  }
}
