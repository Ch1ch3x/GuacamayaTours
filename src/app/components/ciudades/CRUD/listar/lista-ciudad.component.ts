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
  displayedColumns: string[] = ["nombre", "id"];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  formVisibility = false;
  constructor() {}
  total = 2;
  public ciudad = ciudades;

  Ciudad = {
    nombre: "",
    imagen: "",
    estado: 0,
    id: this.ciudad.length + 1
  };
  
  ngOnInit() {
    this.ciudad = ciudades;
  }
  openCrear() {
    this.formVisibility = true;
  }
  crearCiudad() {
    this.formVisibility = false;
  }
}
