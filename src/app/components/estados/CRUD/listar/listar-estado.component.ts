import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";

import estados from "../../../../data/estados.json";
import { estado } from "../../../../interfaces/estado";

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
  constructor() {}
  total = 3;
  public estado = estados;
  selectedRowIndex: number = -1;

  Estado = {
    nombre: "",
    imagen: "",
    id: this.estado.length + 1,
<<<<<<< HEAD
    deshabilitar: false,
=======
    deshabilitar: false
>>>>>>> a141e2edeb070df11267fd1ef75b5e2989c304ee
  };


  ngOnInit() {
    this.estado = estados;
  }

  clearEstado() {
    this.Estado = {
      nombre: "",
      imagen: "",
      id: this.estado.length + 1,
<<<<<<< HEAD
      deshabilitar: false,
=======
      deshabilitar: false
>>>>>>> a141e2edeb070df11267fd1ef75b5e2989c304ee
    };
  }

  openCrear() {
    this.formVisibility = true;
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
