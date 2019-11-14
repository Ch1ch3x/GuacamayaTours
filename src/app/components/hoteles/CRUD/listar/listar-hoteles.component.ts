import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";
import { hotel } from "../../../../interfaces/hotel";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotelesService } from "../../../../services/firebase/hoteles.service";
import { CiudadesService } from 'src/app/services/firebase/ciudades.service.js';
import { EstadosService } from 'src/app/services/firebase/estados.service.js';


@Component({
  selector: "app-listar-hoteles",
  templateUrl: "./listar-hoteles.component.html",
  styleUrls: ["./listar-hoteles.component.scss"]
})
export class ListarHotelesComponent implements OnInit {
  ciudades = [];
  estados = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  total = 2;


  public hoteles = [];
  public documentId = null;
  public currentStatus = 1;
  public newHotelForm = new FormGroup({

    nombre: new FormControl('', Validators.required),
    estrellas: new FormControl('', Validators.required),
    servicios: new FormControl('', Validators.required),
    actividades: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
    idEstado: new FormControl('', Validators.required),
    idCiudad: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    fullDay: new FormGroup({
      costo: new FormControl(0, Validators.required),
      activo: new FormControl(true, Validators.required),
    }),
    tipoHabitaciones: new FormControl('', Validators.required),
    imagen: new FormControl(''),
    imagen2: new FormControl(''),
    imagen3: new FormControl(''),
    deshabilitar: new FormControl(null)
  });


  constructor(private HotelSV: HotelesService, private CiudadSV: CiudadesService, private EstadosSV: EstadosService) {
    this.newHotelForm.setValue({
      nombre: '',
      estrellas: '',
      direccion: '',
      servicios: '',
      actividades: '',
      latitud: '',
      longitud: '',
      idEstado: '',
      idCiudad: '',
      fullDay: {costo: 0, activo: null},
      tipoHabitaciones: '',
      imagen: '',
      imagen2: '',
      imagen3: '',
      deshabilitar: true
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
          idEstado: ordenData.payload.doc.data().idEstado,
          idCiudad: ordenData.payload.doc.data().idCiudad,
          direccion: ordenData.payload.doc.data().direccion,
          /* costoFullday: ordenData.payload.doc.data().fullday.costo,
          activoFullday: ordenData.payload.doc.data().fullday.activo, */
          imagen: ordenData.payload.doc.data().imagen,
          deshabilitar: ordenData.payload.doc.data().deshabilitar
        });
      })
    });
    this.EstadosSV.getAll().subscribe((estadosSnapshot) => {
      this.estados = [];
      estadosSnapshot.forEach((estadoData: any) => {
        this.estados.push({
          id: estadoData.payload.doc.data(),
          nombre: estadoData.payload.doc.data().nombre,
          imagen: estadoData.payload.doc.data().imagen,
          deshabilitar: estadoData.payload.doc.data().deshabilitar,
        });
      })
    });
    this.CiudadSV.getAll().subscribe((ciudadesSnapshot) => {
      this.ciudades = [];
      ciudadesSnapshot.forEach((ciudadData: any) => {
        this.ciudades.push({
          id: ciudadData.payload.doc.data(),
          nombre: ciudadData.payload.doc.data().nombre,
          idEstado: ciudadData.payload.doc.data().idEstado,
          imagen: ciudadData.payload.doc.data().imagen,
          deshabilitar: ciudadData.payload.doc.data().deshabilitar
        });
      })
      console.log(this.ciudades);
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
        idEstado: form.idEstado,
        idCiudad: form.idCiudad,
        direccion: form.direccion,
        fullDay: {
          costo: form.costo,
          activo: form.activo},
        imagen: form.imagen,
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: true
      }
      this.HotelSV.create(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newHotelForm.setValue({
          nombre: '',
          estrellas: '',
          servicios: '',
          latitud: '',
          longitud: '',
          idEstado: '',
          idCiudad: '',
          direccion: '',
          fullDay: {
            costo: 0,
            activo: null
          },
          imagen: '',
          imagen2: '',
          imagen3: '',

          deshabilitar: true
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      this.close();
    }
  }

  public editHotel(documentId) {
    let editSubscribe = this.HotelSV.getHotel(documentId).subscribe((hotel) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newHotelForm.setValue({
        id: documentId,
        nombre: hotel.payload.data()['nombre'],
        estrellas: hotel.payload.data()['estrellas'],
        servicios: hotel.payload.data()['servicios'],
        latitud: hotel.payload.data()['latitud'],
        longitud: hotel.payload.data()['longitud'],
        idEstado: hotel.payload.data()['idEstado'],
        idCiudad: hotel.payload.data()['idCiudad'],
        direccion: hotel.payload.data()['direccion'],
        /*costoFullday: hotel.payload.data()['costoFullday'],
        activoFullday: hotel.payload.data()['activoFullday'],*/
        imagen: hotel.payload.data()['imagen'],
        deshabilitar: hotel.payload.data()['deshabilitar'],
      });
      editSubscribe.unsubscribe();
    });
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
    this.currentStatus = 1;
  }

  crearHotel() {
    this.formVisibility = false;
    this.crearformVisibility = false;
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
  }

  close() {
    this.currentStatus = 3;
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  modificarCiudad() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }


  highlight(dato) {
    this.selectedRowIndex = dato.id;
  }

  deshabilitar() {
    for (let index = 0; index < this.hoteles.length; index++) {
      if (this.hoteles[index].id == this.selectedRowIndex) {
        this.hoteles[index].deshabilitar = false;
      } else {
        continue;
      }
    }
  }

  habilitar() {
    for (let index = 0; index < this.hoteles.length; index++) {
      console.log(this.hoteles[index].nombre);
      if (this.hoteles[index].id == this.selectedRowIndex){
        this.hoteles[index].deshabilitar = true;
      } else {
        continue;
      }
    }
  }
}
