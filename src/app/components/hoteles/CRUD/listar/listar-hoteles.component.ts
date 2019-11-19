import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HotelesService } from "../../../../services/firebase/hoteles.service";
import { CiudadesService } from "src/app/services/firebase/ciudades.service.js";
import { EstadosService } from "src/app/services/firebase/estados.service.js";
import { TipoHabitacionService } from "src/app/services/firebase/tipo-habitacion.service";

@Component({
  selector: "app-listar-hoteles",
  templateUrl: "./listar-hoteles.component.html",
  styleUrls: ["./listar-hoteles.component.scss"]
})
export class ListarHotelesComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  total = 2;

  public ciudades = [];
  public estados = [];
  public hoteles = [];
  public tipoHabitaciones = [];
  public documentId = null;
  public currentStatus = 1;
  public newHotelForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    estrellas: new FormControl(0, Validators.required),
    servicios: new FormControl("", Validators.required),
    latitud: new FormControl("", Validators.required),
    longitud: new FormControl("", Validators.required),
    idEstado: new FormControl("", Validators.required),
    idCiudad: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    costo: new FormControl(0, Validators.required),
    activo: new FormControl(true, Validators.required),
    tipoHabitaciones: new FormControl("", Validators.required),
    imagen: new FormControl(""),
    deshabilitar: new FormControl(null)
  });

  constructor(
    private HotelSV: HotelesService,
    private CiudadSV: CiudadesService,
    private EstadosSV: EstadosService,
    private tipoHabitacionService: TipoHabitacionService
  ) {
    this.newHotelForm.setValue({
      nombre: "",
      estrellas: 0,
      direccion: "",
      servicios: "",
      latitud: "",
      longitud: "",
      idEstado: "",
      idCiudad: "",
      costo: 0,
      activo: null,
      tipoHabitaciones: "",
      imagen: "",
      deshabilitar: true
    });
  }

  selectedRowIndex: number = -1;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.tipoHabitacionService.getAll().subscribe(tipoHabitaciones => {
      this.tipoHabitaciones = tipoHabitaciones.docs.map(tipoHabitacion => ({
        ...tipoHabitacion.data(),
        id: tipoHabitacion.id
      }));
      this.HotelSV.getAll().subscribe(hotelesSnapshot => {
        this.hoteles = [];
        hotelesSnapshot.docs.forEach((ordenData: any) => {
          this.hoteles.push({
            id: ordenData.id,
            nombre: ordenData.data().nombre,
            estrellas: ordenData.data().estrellas,
            servicios: ordenData.data().servicios,
            latitud: ordenData.data().latitud,
            longitud: ordenData.data().longitud,
            idEstado: ordenData.data().idEstado,
            idCiudad: ordenData.data().idCiudad,
            direccion: ordenData.data().direccion,
            costoFullday: ordenData.data().fullday.costo,
            activoFullday: ordenData.data().fullday.activo,
            tipoHabitaciones: ordenData
              .data()
              .tipoHabitaciones.map(
                tipoH =>
                  this.tipoHabitaciones.filter(
                    tH => tH.id === tipoH.tipoHabitacion
                  )[0].nombre
              ),
            imagen: ordenData.data().imagen,
            deshabilitar: ordenData.data().deshabilitar
          });
        });
      });
    });
    this.EstadosSV.getAll().subscribe(estadosSnapshot => {
      this.estados = [];
      estadosSnapshot.docs.forEach((estadoData: any) => {
        this.estados.push({
          id: estadoData.id,
          nombre: estadoData.data().nombre,
          imagen: estadoData.data().imagen,
          deshabilitar: estadoData.data().deshabilitar
        });
      });
    });
    this.CiudadSV.getAll().subscribe(ciudadesSnapshot => {
      this.ciudades = [];
      ciudadesSnapshot.docs.forEach((ciudadData: any) => {
        this.ciudades.push({
          id: ciudadData.id,
          nombre: ciudadData.data().nombre,
          idEstado: ciudadData.data().idEstado,
          imagen: ciudadData.data().imagen,
          deshabilitar: ciudadData.data().deshabilitar
        });
      });
    });
  }

  public newHotel(form, documentId = this.documentId) {
    const th = this.tipoHabitaciones.filter(
      tH => tH.id == form.tipoHabitaciones
    )[0];
    let data = {
      nombre: form.nombre,
      estrellas: form.estrellas,
      servicios: [form.servicios],
      latitud: form.latitud,
      longitud: form.longitud,
      idEstado: form.idEstado,
      idCiudad: form.idCiudad,
      direccion: form.direccion,
      fullday: {
        costo: Number.parseInt(form.costo),
        activo: form.activo == "true" ? true : false
      },
      tipoHabitaciones: [
        {
          tipoHabitacion: th.id,
          fechaInicio: new Date(),
          fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 1))
        }
      ],
      imagen: form.imagen,
      deshabilitar: false
    };
    this.HotelSV.create(data).then(
      () => {
        console.log("Documento creado exitósamente!");
        this.newHotelForm.setValue({
          nombre: "",
          estrellas: "",
          servicios: "",
          latitud: "",
          longitud: "",
          idEstado: "",
          idCiudad: "",
          direccion: "",
          tipoHabitaciones: "",
          costo: 0,
          activo: null,
          imagen: "",
          deshabilitar: false
        });
        this.getData();
      },
      error => {
        console.error(error);
      }
    );
      if (this.currentStatus == 1) {
  }

  public editHotel(documentId) {
    let editSubscribe = this.HotelSV.getHotel(documentId).subscribe(hotel => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newHotelForm.setValue({
        id: documentId,
        nombre: hotel.payload.data()["nombre"],
        estrellas: hotel.payload.data()["estrellas"],
        servicios: hotel.payload.data()["servicios"],
        latitud: hotel.payload.data()["latitud"],
        longitud: hotel.payload.data()["longitud"],
        idEstado: hotel.payload.data()["idEstado"],
        idCiudad: hotel.payload.data()["idCiudad"],
        direccion: hotel.payload.data()["direccion"],
        /*costoFullday: hotel.payload.data()['costoFullday'],
        activoFullday: hotel.payload.data()['activoFullday'],*/
        imagen: hotel.payload.data()["imagen"],
        deshabilitar: hotel.payload.data()["deshabilitar"]
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

  soltar() {
    this.highlight(-1);
  }

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.hoteles.length; index++) {
      if (this.hoteles[index].id == this.selectedRowIndex) {
        this.numerito = index
        this.hoteles[index].deshabilitar = false;
      } else {
        continue;
      }
    }
    this.deshabilitarHotel(this.selectedRowIndex);
  }

  habilitar() {
    for (let index = 0; index < this.hoteles.length; index++) {
      console.log(this.hoteles[index].nombre);
      if (this.hoteles[index].id == this.selectedRowIndex) {
        this.numerito = index
        this.hoteles[index].deshabilitar = true;
      } else {
        continue;
      }
    }
    this.habilitarHotel(this.selectedRowIndex);
  }

  public habilitarHotel(documentId) {
    console.log('hasta aqui todo bien');
    let data = {
      nombre: this.hoteles[this.numerito].nombre,
      estrellas: this.hoteles[this.numerito].estrellas,
      servicios: this.hoteles[this.numerito].servicios,
      latitud: this.hoteles[this.numerito].latitud,
      longitud: this.hoteles[this.numerito].longitud,
      idEstado: this.hoteles[this.numerito].idEstado,
      idCiudad: this.hoteles[this.numerito].idCiudad,
      direccion: this.hoteles[this.numerito].direccion,
      fullDay: {
        costo: this.hoteles[this.numerito].costoFullday,
        activo: this.hoteles[this.numerito].activoFullday
      },
      imagen: this.hoteles[this.numerito].imagen,
      deshabilitar: true
    };
    console.log('hasta aqui todo bien');
    this.HotelSV.update(documentId, data).then(() => {
      console.log('Documento modificado exitósamente!');
      this.newHotelForm.setValue({
        nombre: "",
        estrellas: 0,
        servicios: "",
        latitud: "",
        longitud: "",
        idEstado: "",
        idCiudad: "",
        direccion: "",
        fullDay: {
          costo: 0,
          activo: null
        },
        imagen: "",

        deshabilitar: true
      });
    }, (error) => {
      console.error(error);
    });
  }

  public deshabilitarHotel(documentId) {
    let data = {
      nombre: this.hoteles[this.numerito].nombre,
      estrellas: this.hoteles[this.numerito].estrellas,
      servicios: this.hoteles[this.numerito].servicios,
      latitud: this.hoteles[this.numerito].latitud,
      longitud: this.hoteles[this.numerito].longitud,
      idEstado: this.hoteles[this.numerito].idEstado,
      idCiudad: this.hoteles[this.numerito].idCiudad,
      direccion: this.hoteles[this.numerito].direccion,
      fullDay: {
        costo: this.hoteles[this.numerito].costoFullday,
        activo: this.hoteles[this.numerito].activoFullday
      },
      imagen: this.hoteles[this.numerito].imagen,
      deshabilitar: false
    };
    this.HotelSV.update(documentId, data).then(() => {
      console.log('Documento modificado exitósamente!');
      this.newHotelForm.setValue({
        nombre: "",
        estrellas: "",
        servicios: "",
        latitud: "",
        longitud: "",
        idEstado: "",
        idCiudad: "",
        direccion: "",
        fullDay: {
          costo: 0,
          activo: null
        },
        imagen: "",

        deshabilitar: true
      });
    }, (error) => {
      console.error(error);
    });
  }

}
