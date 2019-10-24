import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-hoteles',
  templateUrl: './listar-hoteles.component.html',
  styleUrls: ['./listar-hoteles.component.scss']
})
export class ListarHotelesComponent implements OnInit {

  constructor() { }

  total = 2;
  nombre = "";
  ciudad = "";
  latitud = "";
  longitud = "";
  direccion = "";
  estado = "";
  id;

  public hotel = hoteles;

  ngOnInit() {
  }

}