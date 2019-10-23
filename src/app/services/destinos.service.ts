import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import destinos from '../data/destinos.json';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {


  constructor() { }

  getDestinos() {
    destinos;
  }

  modificarDestinos(){
    destinos[0].id[""];
    destinos[0].nombre[""];
    destinos[0].descripcion[""];
    destinos[0].tipo[""];
    destinos[0].servicios[""];
    destinos[0].actividades[""];
    destinos[0].latitud[""];
    destinos[0].longitud[""];
    destinos[0].estado[""];
    destinos[0].ciudad[""];
    destinos[0].direccion[""];
  }

  
}
