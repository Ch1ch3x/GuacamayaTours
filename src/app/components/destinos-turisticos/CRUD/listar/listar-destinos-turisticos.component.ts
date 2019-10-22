import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material';

export interface UsersData {
  name: string;
  tipo: string;
  servicios: string;
  actividades: string;
  latitud: string;
  longitud: string;
  direccion: string;
  description: string;
  estado: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {
    id: 632,
    name: 'Parque Nacional Morrocoy',
    estado: 'Falcon',
    tipo: 'Playa',
    servicios: 'Servicios',
    actividades: 'Actividades',
    latitud: 'latitud',
    longitud: 'longitud',
    direccion: 'direccion',
    description: 'Parque Nacional Morrocoy, con hermosas bahías e islas de arena blanca y fina, al este, al oeste considerar que está rodeado por el humedal Refugio de Vida Silvestre Cuare y al sur por el Golfete de Cuare. Inicialmente habitada por los indios caribes, y su nombre en voz Caribe que significa un lugar donde nació nuestro sol.'
  },
  {
    id: 614,
    name: 'Playa el Agua',
    estado: 'Nueva Esparta',
    tipo: 'Playa',
    servicios: 'Servicios',
    actividades: 'Actividades',
    latitud: 'latitud',
    longitud: 'longitud',
    direccion: 'direccion',
    description: 'En la Isla de Margarita, Playa el Agua, es la playa más famosa y visitada. Presenta un escenario tropical de aguas cristalinas semi oceánicas, blancas arenas y verdes palmeras que se expanden aproximadamente a unos 4 kilómetros de largo y 30 metros de ancho en la zona noreste de la isla.'
  },
  {
    id: 815,
    name: 'Punta Brava',
    estado: 'Falcon',
    tipo: 'Playa',
    servicios: 'Servicios',
    actividades: 'Actividades',
    latitud: 'latitud',
    longitud: 'longitud',
    direccion: 'direccion',
    description: 'Es una playa con bastante afluencia los fines de semana; posee pocas palmeras, sus aguas son cristalinas y tranquilas, excelentes para relajarse; allí podrás conseguir diversos vendedores ambulantes, disfrutar de la calidad de los servicios ofrecidos en cuanto al alquiler de toldos y sillas, además de la exquisita comida marítima.'
  }
];



@Component({
  selector: 'app-listar-destinos-turisticos',
  templateUrl: './listar-destinos-turisticos.component.html',
  styleUrls: ['./listar-destinos-turisticos.component.scss']
})

export class ListarDestinosTuristicosComponent {
  displayedColumns: string[] = ['name', 'estado', 'tipo', 'actividades', 'servicios', 'latitud', 'longitud', 'direccion', 'description', 'id'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor() { }

  openCrear() { }
}
