import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HotelesModule {
  IdHotel: [String];
  Nombre: [String];
  Estrellas: [Number];
  Latitud: String;
  longitud: String;
  Direccion: String;
  Estado: Boolean;
  Fotos: '';
  // Ciudad falta llamarla
  FullDay: Boolean;
  PrecioFull: Number;
  // Servicios: [Map] investigar
  CostoNoche: Number;
  // TiposDeHabitaciones: [Map]

 }
