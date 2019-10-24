import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';

import ciudades from '../../../../data/ciudades.json';
import { ciudad } from '../../../../interfaces/ciudad';

const ELEMENT_DATA: ciudad[] = ciudades;

@Component({
  selector: 'app-lista-ciudad',
  templateUrl: './lista-ciudad.component.html',
  styleUrls: ['./lista-ciudad.component.scss']
})

export class ListaCiudadComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'estado', 'id'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,  { static: true}) table: MatTable<any>;
  
  formVisibility = false;
  
  constructor() { }
  total = 2;
  nombre = "";
  estado = "";
  imagen = "";
  id;

  public ciudad = ciudades;

  ngOnInit() {
    this.ciudad = ciudades;
  }

  openCrear() {
    this.formVisibility = true;
  }

  crearEstado() {
    this.formVisibility = false;

  }

}
