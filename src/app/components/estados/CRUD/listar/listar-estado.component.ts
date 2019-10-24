import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';

import estados from '../../../../data/estados.json';
import { estado } from '../../../../interfaces/estado';

const ELEMENT_DATA: estado[] = estados;

@Component({
  selector: 'app-listar-estado',
  templateUrl: './listar-estado.component.html',
  styleUrls: ['./listar-estado.component.scss']
})

export class ListarEstadoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'id'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable,  { static: true}) table: MatTable<any>;
  formVisibility = false;
  constructor() { }
  total = 2;
  nombre = "";
  imagen = "";
  id;

  public estado = estados;

  ngOnInit() {
    this.estado = estados;
  }

  openCrear() {
    this.formVisibility = true;
  }

  crearEstado() {
    this.formVisibility = false;

  }

}
