import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";
import hoteles from "../../../../data/hoteles.json";
import { hotel } from "../../../../interfaces/hotel";
import * as ciudades from "../../../../data/ciudades.json";
import * as estados from "../../../../data/estados.json";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotelesService } from "../../../../services/firebase/hoteles.service";

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
  ciudades = ciudades;
  estados = estados;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;

  total = 2;

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
    ],
    deshabilitar: false,
  };

  public hoteles = [];
  public documentId = null;
  public currentStatus = 1;
  public newDestinoForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    estrellas: new FormControl('', Validators.required),
    servicios: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    fullDay: new FormControl('', Validators.required),
    tipoHabitaciones: new FormControl('', Validators.required),
    imagen: new FormControl(''),
    imagen2: new FormControl(''),
    imagen3: new FormControl(''),
    deshabilitar: new FormControl('')

  });


  constructor(private HotelSV: HotelesService) {
    this.newDestinoForm.setValue({
      id: '',
      nombre: '',
      servicios: '',
      latitud: '',
      longitud: '',
      estado: '',
      ciudad: '',
      fullDay: '',
      tipoHabitaciones: '',
      imagen: '',
      imagen2: '',
      imagen3: '', 
      deshabilitar: ''
    });
  }

  selectedRowIndex: number = -1;

  ngOnInit() {
    this.HotelSV.getAll().subscribe((hotelesSnapshot) => {
      this.hoteles = [];
      hotelesSnapshot.forEach((destinoData: any) => {
        this.hoteles.push({
          id: destinoData.payload.doc.id,
          nombre: destinoData.payload.doc.data().nombre,
          estrellas:destinoData.payload.doc.data().estrellas,
          servicios: destinoData.payload.doc.data().servicios,
          latitud: destinoData.payload.doc.data().latitud,
          longitud: destinoData.payload.doc.data().longitud,
          estado: destinoData.payload.doc.data().estado,
          ciudad: destinoData.payload.doc.data().ciudad,
          direccion: destinoData.payload.doc.data().direccion,
          fullDay: destinoData.payload.doc.data().fullDay,
          imagen: destinoData.payload.doc.data().imagen,
          imagen2: destinoData.payload.doc.data().imagen2,
          imagen3: destinoData.payload.doc.data().imagen3,
          deshabilitar: destinoData.payload.doc.data().deshabilitar
        });
        console.log(this.hoteles)
      })
    });
    

  }

  public newHotel(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        estrellas: form.estrellas,
        servicios: form.servicios,
        latitud: form.latitud,
        longitud: form.longitud,
        estado: form.estado,
        ciudad: form.ciudad,
        direccion: form.direccion,
        fullDay: form.fullDay,
        imagen: form.imagen,
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: form.deshabilitar
      }
      this.HotelSV.create(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newDestinoForm.setValue({
          nombre: '',
          estrellas: '',
          servicios: '',
          latitud: '',
          longitud: '',
          estado: '',
          ciudad: '',
          direccion: '',
          fullDay: '',
          imagen: '',
          imagen2: '',
          imagen3: '',
          id: '',
          deshabilitar: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        tipo: form.tipo,
        servicios: form.servicios,
        actividades: form.actividades,
        latitud: form.latitud,
        longitud: form.longitud,
        estado: form.estado,
        ciudad: form.ciudad,
        direccion: form.direccion,
        imagen: form.imagen,
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: form.deshabilitar
      }
      this.HotelSV.update(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newDestinoForm.setValue({
          nombre: '',
          estrellas: '',
          servicios: '',
          latitud: '',
          longitud: '',
          estado: '',
          ciudad: '',
          direccion: '',
          fullDay: '',
          deshabilitar: '',
          imagen:'',
          imagen2: '',
          imagen3: '',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

  public editHotel(documentId) {
    let editSubscribe = this.HotelSV.getHotel(documentId).subscribe((hotel) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newDestinoForm.setValue({
        id: documentId,
        nombre: hotel.payload.data()['nombre'],
        estrellas: hotel.payload.data()['tipo'],
        servicios:hotel.payload.data()['servicios'],
        actividades: hotel.payload.data()['actividades'],
        latitud: hotel.payload.data()['latitud'],
        longitud: hotel.payload.data()['longitud'],
        estado:hotel.payload.data()['estado'],
        ciudad: hotel.payload.data()['ciudad'],
        direccion: hotel.payload.data()['direccion'],
        imagen: hotel.payload.data()['imagen'],
        imagen2: hotel.payload.data()['imagen2'],
        imagen3: hotel.payload.data()['imagen3'],
        desabilitar: hotel.payload.data()['desabilitar'],
      });
      editSubscribe.unsubscribe();
    });
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
      ],
      deshabilitar: false,
    };
  }

  addRowData() {
    hoteles.push(this.Hotel);
    this.clearHotel();
    this.table.renderRows();
  }
}
