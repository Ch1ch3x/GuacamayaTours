import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  
  constructor(public httpService: HttpClient) { 
    }
    getCiudades() {
      return this.httpService.get('../data/ciudades.json')
  }
}
