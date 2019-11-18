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
    estrellas: new FormControl("", Validators.required),
    servicios: new FormControl("", Validators.required),
    actividades: new FormControl("", Validators.required),
    latitud: new FormControl("", Validators.required),
    longitud: new FormControl("", Validators.required),
    idEstado: new FormControl("", Validators.required),
    idCiudad: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    fullDay: new FormGroup({
      costo: new FormControl(0, Validators.required),
      activo: new FormControl(true, Validators.required)
    }),
    tipoHabitaciones: new FormControl("", Validators.required),
    imagen: new FormControl(""),
    imagen2: new FormControl(""),
    imagen3: new FormControl(""),
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
      estrellas: "",
      direccion: "",
      servicios: "",
      actividades: "",
      latitud: "",
      longitud: "",
      idEstado: "",
      idCiudad: "",
      fullDay: { costo: 0, activo: null },
      tipoHabitaciones: "",
      imagen: "",
      imagen2: "",
      imagen3: "",
      deshabilitar: true
    });
  }

  selectedRowIndex: number = -1;

  ngOnInit() {
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
            tipoHabitaciones: ordenData.data().tipoHabitaciones.map(tipoH =>
              this.tipoHabitaciones.filter(tH => tH.id === tipoH.tipoHabitacion)[0].nombre),
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
          activo: form.activo
        },
        imagen: form.imagen,
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: true
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
            fullDay: {
              costo: 0,
              activo: null
            },
            imagen: "",
            imagen2: "",
            imagen3: "",

            deshabilitar: true
          });
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.close();
    }
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
      if (this.hoteles[index].id == this.selectedRowIndex) {
        this.hoteles[index].deshabilitar = true;
      } else {
        continue;
      }
    }
  }
}
