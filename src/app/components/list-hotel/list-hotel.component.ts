import { Component, OnInit } from '@angular/core';
import { Hotel } from '../temporales/hotel';
import { Estado } from '../temporales/estado';
import { HOTELES } from '../temporales/temporales';
import { ESTADOS } from '../temporales/temporales'

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.scss']
})

//LOS HOTELES SE IMPORTAN DEL SERVICE QUE TRAIGA LA INFORMACION
export class ListHotelComponent implements OnInit {
  hoteles = HOTELES;
  estado = ESTADOS;

  constructor() { }

  ngOnInit() {
  }

}
