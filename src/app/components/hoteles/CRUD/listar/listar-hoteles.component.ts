import { Component, ViewChild, OnInit } from "@angular/core";

import { MatTable } from "@angular/material";

import hoteles from "../../../../data/hoteles.json";
import { hotel } from "../../../../interfaces/hotel";

const ELEMENT_DATA: hotel[] = hoteles;

@Component({
  selector: "app-listar-hoteles",
  templateUrl: "./listar-hoteles.component.html",
  styleUrls: ["./listar-hoteles.component.scss"]
})
export class ListarHotelesComponent implements OnInit {
  displayedColumns: string[] = [
    "nombre",
    "estado",
    "ciudad",
    "latitud",
    "longitud",
    "direccion",
    "id"
  ];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;

  constructor() {}

  total = 2;
  nombre = "";
  ciudad = "";
  latitud = "";
  longitud = "";
  direccion = "";
  estado = "";
  id;

  public hotel = hoteles;

  Hotel = {
    id: this.hotel.length,
    nombre: "",
    actividades: [""],
    estrellas: 3,
    latitud: "",
    longitud: "",
    direccion: "",
    estado: "",
    fotos: [""],
    ciudad: "",
    fullDay: {
      disponible: true,
      precioXPersona: ""
    },
    servicios: [],
    tipoHabitaciones: [
      {
        nombre: "",
        fotos: [],
        tipoVista: "",
        maximoPersonas: "",
        comodidades: [],
        costoXNoche: 0
      }
    ]
  };
  ngOnInit() {
    this.hotel = hoteles;
  }

  openCrear() {
    this.formVisibility = true;
  }

  crearHotel() {
    this.addRowData();
    this.formVisibility = false;
  }

  clearHotel() {
    this.Hotel = {
      id: this.hotel.length,
      nombre: "",
      actividades: [""],
      estrellas: 3,
      latitud: "",
      longitud: "",
      direccion: "",
      estado: "",
      fotos: [""],
      ciudad: "",
      fullDay: {
        disponible: false,
        precioXPersona: ""
      },
      servicios: [],
      tipoHabitaciones: [
        {
          nombre: "",
          fotos: [],
          tipoVista: "",
          maximoPersonas: "",
          comodidades: [],
          costoXNoche: 0
        }
      ]
    };
  }

  addRowData() {
    hoteles.push(this.Hotel);
    this.clearHotel();
    this.table.renderRows();
  }
}
