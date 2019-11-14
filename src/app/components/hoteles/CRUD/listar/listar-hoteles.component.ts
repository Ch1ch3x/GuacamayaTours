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
  public newHotelForm = new FormGroup({
    
    nombre: new FormControl('', Validators.required),
    estrellas: new FormControl('', Validators.required),
    servicios: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    fullDay: new FormGroup({
      costo: new FormControl('', Validators.required),
      activo: new FormControl('', Validators.required),
    }),
    tipoHabitaciones: new FormControl('', Validators.required),
    imagen: new FormControl(''),
    imagen2: new FormControl(''),
    imagen3: new FormControl(''),
    deshabilitar: new FormControl('')
  });


  constructor(private HotelSV: HotelesService) {
    this.newHotelForm.setValue({
      
      nombre: '',
      estrellas: '',
      direccion: '',
      servicios: '',
      latitud: '',
      longitud: '',
      estado: '',
      ciudad: '',
      fullDay: {costo: '', activo: ''},
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
      hotelesSnapshot.forEach((ordenData: any) => {
        this.hoteles.push({
          id: ordenData.payload.doc.id,
          nombre: ordenData.payload.doc.data().nombre,
          estrellas: ordenData.payload.doc.data().estrellas,
          servicios: ordenData.payload.doc.data().servicios,
          latitud: ordenData.payload.doc.data().latitud,
          longitud: ordenData.payload.doc.data().longitud,
          estado: ordenData.payload.doc.data().estado,
          ciudad: ordenData.payload.doc.data().ciudad,
          direccion: ordenData.payload.doc.data().direccion,
          costoFullday: ordenData.payload.doc.data().fullday.costo,
          activoFullday: ordenData.payload.doc.data().fullday.activo,
          imagen: ordenData.payload.doc.data().imagen,
          imagen2: ordenData.payload.doc.data().imagen2,
          imagen3: ordenData.payload.doc.data().imagen3,
          deshabilitar: ordenData.payload.doc.data().deshabilitar
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
        costo: form.costo,
        activo: form.activo,
        imagen: form.imagen,
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: form.deshabilitar
      }
      this.HotelSV.create(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newHotelForm.setValue({
          nombre: '',
          estrellas: '',
          servicios: '',
          latitud: '',
          longitud: '',
          estado: '',
          ciudad: '',
          direccion: '',
          costo: '',
          activo: '',
          imagen: '',
          imagen2: '',
          imagen3: '',
          
          deshabilitar: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        estrellas: form.estrellas,
        servicios: form.servicios,
        latitud: form.latitud,
        longitud: form.longitud,
        estado: form.estado,
        ciudad: form.ciudad,
        direccion: form.direccion,
        costo: form.costo,
        activo: form.activo,
        imagen: form.imagen,
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: form.deshabilitar
      }
      this.HotelSV.update(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newHotelForm.setValue({
          nombre: '',
          estrellas: '',
          servicios: '',
          latitud: '',
          longitud: '',
          estado: '',
          ciudad: '',
          direccion: '',
          costo: '',
          activo: '',
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
      this.newHotelForm.setValue({
        id: documentId,
        nombre: hotel.payload.data()['nombre'],
        estrellas:hotel.payload.data()['estrellas'],
        servicios: hotel.payload.data()['servicios'],
        latitud: hotel.payload.data()['latitud'],
        longitud: hotel.payload.data()['longitud'],
        estado:hotel.payload.data()['estado'],
        ciudad: hotel.payload.data()['ciudad'],
        direccion: hotel.payload.data()['direccion'],
        costo: hotel.payload.data()['costo'],
        activo: hotel.payload.data()['activo'],
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
