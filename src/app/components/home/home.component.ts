import { Component, OnInit } from '@angular/core';
import { TOP } from '../temporales/temporales';
import { ESTADOS } from '../temporales/temporales';
import { DESTINOS } from '../temporales/temporales';
import { HOTELES } from '../temporales/temporales'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  top = TOP;
  estado = ESTADOS;
  destinos = DESTINOS;
  hoteles = HOTELES;

  constructor() { }

  ngOnInit() {
  }

}
