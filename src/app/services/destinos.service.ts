import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import destinos from '../data/destinos.json';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {


  constructor() { }

  getDestinos() {
    return destinos;
  }
}
