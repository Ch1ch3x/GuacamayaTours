import { Component, OnInit } from '@angular/core';
import { Hotel } from '../temporales/hotel';
import { HOTELES } from '../temporales/hoteles'

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.scss']
})

//LOS HOTELES SE IMPORTAN DEL SERVICE QUE TRAIGA LA INFORMACION
export class ListHotelComponent implements OnInit {
  hoteles = HOTELES;

  constructor() { }

  ngOnInit() {
  }

}
