import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable, MatChipInputEvent } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HotelesService } from "../../../../services/firebase/hoteles.service";
import { CiudadesService } from "src/app/services/firebase/ciudades.service.js";
import { EstadosService } from "src/app/services/firebase/estados.service.js";
import { TipoHabitacionService } from "src/app/services/firebase/tipo-habitacion.service";
import { Title } from "@angular/platform-browser";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

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
  public hotel: any;
  public hoteles = [];
  public servicios = [];
  public imagenes = [];
  public filteredCiudades = [];
  public tipoHabitaciones = [];
  public documentId = null;
  public tipoHabs = [];
  public currentStatus = 1;
  public salida: Date;
  public llegada: Date;

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
    costoHab: new FormControl(0, Validators.required),
    activo: new FormControl(true, Validators.required),
    tipoHabitaciones: new FormControl("", Validators.required),
    imagen: new FormControl(""),
    imagenes: new FormControl(""),
    deshabilitar: new FormControl(null)
  });

  public editHotelForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    estrellas: new FormControl(0, Validators.required),
    servicios: new FormControl("", Validators.required),
    latitud: new FormControl("", Validators.required),
    longitud: new FormControl("", Validators.required),
    idEstado: new FormControl("", Validators.required),
    idCiudad: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    costo: new FormControl(0, Validators.required),
    costoHab: new FormControl(0, Validators.required),
    activo: new FormControl(true, Validators.required),
    tipoHabitaciones: new FormControl("", Validators.required),
    imagen: new FormControl(""),
    imagenes: new FormControl(""),
    deshabilitar: new FormControl(null)
  });

  constructor(
    private HotelSV: HotelesService,
    private CiudadSV: CiudadesService,
    private EstadosSV: EstadosService,
    private tipoHabitacionService: TipoHabitacionService,
    private titleService: Title,
    private firebaseService: FirestoreService
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
      imagenes: "",
      deshabilitar: false,
      costoHab: 0
    });
    this.editHotelForm.setValue({
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
      imagenes: "",
      costoHab: 0,

      deshabilitar: false
    });
    this.titleService.setTitle("Admin: Hoteles");
  }

  selectedRowIndex: string;

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
            tipoHabitaciones: ordenData.data().tipoHabitaciones,
            imagen: ordenData.data().imagen,
            imagenes: ordenData.data().imagenes,
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
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        estrellas: form.estrellas,
        servicios: this.servicios,
        latitud: form.latitud,
        longitud: form.longitud,
        idEstado: form.idEstado,
        idCiudad: form.idCiudad,
        direccion: form.direccion,
        fullday: {
          costo: Number.parseInt(form.costo),
          activo: form.activo == "true" ? true : false
        },
        tipoHabitaciones: this.tipoHabs,
        imagen: form.imagen,
        imagenes: this.imagenes,
        deshabilitar: false
      };
      this.HotelSV.create(data).then(
        () => {
          console.log("Documento creado exitósamente!");
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
            imagenes: "",
            deshabilitar: false,
            costoHab: 0
          });
          this.getData();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  public editHotel(form, documentId = this.selectedRowIndex) {
    let data = {
      nombre: form.nombre,
      estrellas: form.estrellas,
      servicios: this.servicios,
      latitud: form.latitud,
      longitud: form.longitud,
      idEstado: form.idEstado,
      idCiudad: form.idCiudad,
      direccion: form.direccion,
      fullday: {
        costo: Number.parseInt(form.costo),
        activo: form.activo == "true" ? true : false
      },
      tipoHabitaciones: this.tipoHabs,
      imagen: form.imagen,
      imagenes: this.imagenes,
      deshabilitar: false
    };
    this.HotelSV.update(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.editHotelForm.setValue({
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
          imagenes: "",
          deshabilitar: false,
          costoHab: 0
        });
        this.getData();
        this.close();
      },
      error => {
        console.error(error);
      }
    );
  }

  addTipoHab(whichForm) {
    if (whichForm == 1)
      this.tipoHabs.push({
        nombre: this.tipoHabitaciones.filter(
          th => th.id === this.newHotelForm.value.tipoHabitaciones
        )[0].nombre,
        costo: this.newHotelForm.value.costoHab,
        fechaFin: this.salida,
        fechaInicio: this.llegada,
        tipoHabitacion: this.newHotelForm.value.tipoHabitaciones
      });
    else
      this.tipoHabs.push({
        nombre: this.tipoHabitaciones.filter(
          th => th.id === this.editHotelForm.value.tipoHabitaciones
        )[0].nombre,
        costo: this.editHotelForm.value.costoHab,
        fechaFin: this.salida,
        fechaInicio: this.llegada,
        tipoHabitacion: this.editHotelForm.value.tipoHabitaciones
      });
    this.newHotelForm.setValue({
      ...this.newHotelForm.value,
      idEstado: this.newHotelForm.value.idEstado
        ? this.newHotelForm.value.idEstado
        : "",
      costoHab: 0,
      tipoHabitaciones: ""
    });

    this.editHotelForm.setValue({
      ...this.newHotelForm.value,
      idEstado: this.newHotelForm.value.idEstado
        ? this.newHotelForm.value.idEstado
        : "",
      costoHab: 0,
      tipoHabitaciones: ""
    });
    this.llegada = null;
    this.salida = null;
  }

  removeTipoHabitacion(tipoHabitacion): void {
    const index = this.tipoHabs.indexOf(tipoHabitacion);

    if (index >= 0) {
      this.tipoHabs.splice(index, 1);
    }
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
    this.editHotelForm.setValue({
      nombre: this.hotel.nombre,
      estrellas: this.hotel.estrellas,
      servicios: this.hotel.servicios,
      latitud: this.hotel.latitud,
      longitud: this.hotel.longitud,
      idEstado: this.hotel.idEstado,
      idCiudad: this.hotel.idCiudad,
      direccion: this.hotel.direccion,
      costo: this.hotel.costoFullday,
      activo: this.hotel.activoFullday,
      imagen: this.hotel.imagen,
      imagenes: this.hotel.imagenes,
      costoHab: 0,
      tipoHabitaciones: "",
      deshabilitar: false
    });
    this.tipoHabs = this.hoteles.filter(
      hotel => hotel.id === this.hotel.id
    )[0].tipoHabitaciones;
    this.imagenes = this.hotel.imagenes;
    this.servicios = this.hotel.servicios;
  }

  close() {
    this.currentStatus = 3;
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  modificarHotel() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  highlight(dato) {
    this.selectedRowIndex = dato.id;
    this.hotel = dato;
  }

  soltar() {
    this.highlight(-1);
  }

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.hoteles.length; index++) {
      if (this.hoteles[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.hoteles[index].deshabilitar = true;
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
        this.numerito = index;
        this.hoteles[index].deshabilitar = false;
      } else {
        continue;
      }
    }
    this.habilitarHotel(this.selectedRowIndex);
  }

  onChangeEstado(event) {
    this.filteredCiudades = this.ciudades.filter(
      ciudad => ciudad.idEstado === event
    );
  }

  public habilitarHotel(documentId) {
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
      imagenes: this.hoteles[this.numerito].imagenes,
      deshabilitar: false
    };
    this.HotelSV.update(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
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
          imagenes: "",
          deshabilitar: false
        });
      },
      error => {
        console.error(error);
      }
    );
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
      deshabilitar: true
    };
    this.HotelSV.update(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
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
      },
      error => {
        console.error(error);
      }
    );
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our chip
    if ((value || "").trim()) {
      this.servicios.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(servicio): void {
    const index = this.servicios.indexOf(servicio);

    if (index >= 0) {
      this.servicios.splice(index, 1);
    }
  }

  addImagenes(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our chip
    if ((value || "").trim()) {
      this.imagenes.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeImagenes(imagen): void {
    const index = this.imagenes.indexOf(imagen);

    if (index >= 0) {
      this.imagenes.splice(index, 1);
    }
  }
}
