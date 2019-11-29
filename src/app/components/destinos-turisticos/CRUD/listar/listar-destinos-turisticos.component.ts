import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable, MatChipInputEvent } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DestinosService } from "../../../../services/firebase/destinos.service";
import { CiudadesService } from "src/app/services/firebase/ciudades.service.js";
import { EstadosService } from "src/app/services/firebase/estados.service.js";
import { CategoriasService } from "src/app/services/firebase/categorias.service";
import { Title } from "@angular/platform-browser";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: "app-listar-destinos-turisticos",
  templateUrl: "./listar-destinos-turisticos.component.html",
  styleUrls: ["./listar-destinos-turisticos.component.scss"]
})
export class ListarDestinosTuristicosComponent implements OnInit {
  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
  selectedRowIndex: any;

  public destinos = [];
  public destinoNombre: any;
  public destinoDescripcion: any;
  public destinoServicio: any;
  public destinoActividad: any;
  public destinoLatitud: any;
  public destinoLongitud: any;
  public destinoEstado: any;
  public destinoCiudad: any;
  public destinoCategorias: any;
  public destinoDireccion: any;
  public destinoImagen: any;

  public ciudades = [];
  public servicios = [];
  public actividades = [];
  public estados = [];
  public filteredCiudades = [];
  public categorias = [];
  public documentId = null;
  public currentStatus = 1;
  public newDestinoForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    descripcion: new FormControl("", Validators.required),
    categorias: new FormControl("", Validators.required),
    servicios: new FormControl("", Validators.required),
    actividades: new FormControl("", Validators.required),
    latitud: new FormControl("", Validators.required),
    longitud: new FormControl("", Validators.required),
    idEstado: new FormControl("", Validators.required),
    idCiudad: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    imagen: new FormControl("", Validators.required),
    deshabilitar: new FormControl(true)
  });

  public editDestinoForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    descripcion: new FormControl("", Validators.required),
    categorias: new FormControl("", Validators.required),
    servicios: new FormControl("", Validators.required),
    actividades: new FormControl("", Validators.required),
    latitud: new FormControl("", Validators.required),
    longitud: new FormControl("", Validators.required),
    idEstado: new FormControl("", Validators.required),
    idCiudad: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required),
    imagen: new FormControl("", Validators.required),
    deshabilitar: new FormControl(true)
  });

  constructor(
    private DestinoSV: DestinosService,
    private CiudadSV: CiudadesService,
    private EstadosSV: EstadosService,
    private CategoriaSV: CategoriasService,
    private firebaseService: FirestoreService,
    private titleService: Title
  ) {
    this.newDestinoForm.setValue({
      nombre: "",
      descripcion: "",
      categorias: "",
      servicios: "",
      actividades: "",
      latitud: "",
      longitud: "",
      direccion: "",
      idEstado: "",
      idCiudad: "",
      imagen: "",
      deshabilitar: false
    });
    this.titleService.setTitle("Admin: Destinos Turisticos");
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.DestinoSV.getAll().subscribe(destinosSnapshot => {
      this.destinos = [];
      destinosSnapshot.docs.forEach((destinoData: any) => {
        this.destinos.push({
          id: destinoData.id,
          nombre: destinoData.data().nombre,
          descripcion: destinoData.data().descripcion,
          categorias: destinoData.data().categorias,
          servicios: destinoData.data().servicios,
          actividades: destinoData.data().actividades,
          latitud: destinoData.data().latitud,
          longitud: destinoData.data().longitud,
          idEstado: destinoData.data().idEstado,
          idCiudad: destinoData.data().idCiudad,
          direccion: destinoData.data().direccion,
          imagen: destinoData.data().imagen,
          deshabilitar: destinoData.data().deshabilitar
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
    this.CategoriaSV.getAll().subscribe(categoriasSnapshot => {
      this.categorias = [];
      categoriasSnapshot.docs.forEach(categoriaData => {
        this.categorias.push({
          id: categoriaData.id,
          nombre: categoriaData.data().nombre,
          deshabilitar: categoriaData.data().deshabilitar
        });
      });
    });

    this.firebaseService.getAll("servicios").subscribe(servicios => {
      this.servicios = servicios.docs.map(serv => ({
        ...serv.data(),
        id: serv.id
      }));
    });

    this.firebaseService.getAll("actividades").subscribe(actividades => {
      this.actividades = actividades.docs.map(act => ({
        ...act.data(),
        id: act.id
      }));
    });
  }

  onChangeEstado(event) {
    this.filteredCiudades = this.ciudades.filter(
      ciudad => ciudad.idEstado === event
    );
  }

  public newDestino(form, documentId = this.documentId) {
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        categorias: form.categorias,
        servicios: form.servicios,
        actividades: form.actividades,
        latitud: form.latitud,
        longitud: form.longitud,
        idEstado: form.idEstado,
        idCiudad: form.idCiudad,
        direccion: form.direccion,
        imagen: form.imagen,
        deshabilitar: false
      };
      this.DestinoSV.create(data).then(
        () => {
          console.log("Documento creado exitosamente!");
          this.newDestinoForm.setValue({
            nombre: "",
            descripcion: "",
            categorias: "",
            servicios: "",
            actividades: "",
            latitud: "",
            longitud: "",
            idEstado: "",
            idCiudad: "",
            direccion: "",
            imagen: "",
            deshabilitar: true
          });
          this.getData();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  public editDestino(form, documentId = this.selectedRowIndex) {
    if (this.currentStatus == 2) {
      let data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        categorias: form.categorias,
        servicios: form.servicios,
        actividades: form.actividades,
        latitud: form.latitud,
        longitud: form.longitud,
        idEstado: form.idEstado,
        idCiudad: form.idCiudad,
        direccion: form.direccion,
        imagen: form.imagen,
        deshabilitar: false
      };
      this.DestinoSV.update(documentId, data).then(
        () => {
          console.log("Documento modificado exitósamente!");
          this.editDestinoForm.setValue({
            nombre: "",
            descripcion: "",
            categorias: "",
            servicios: "",
            actividades: "",
            latitud: "",
            longitud: "",
            idEstado: "",
            idCiudad: "",
            direccion: "",
            imagen: "",
            deshabilitar: true
          });
          this.getData();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
    this.currentStatus = 1;
  }

  crearDestino() {
    this.formVisibility = false;
    this.crearformVisibility = false;
  }
  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
    this.currentStatus = 2;
    this.editDestinoForm.setValue({
      nombre: this.destinoNombre,
      descripcion: this.destinoDescripcion,
      categorias: this.destinoCategorias,
      servicios: this.destinoServicio,
      actividades: this.destinoActividad,
      latitud: this.destinoLatitud,
      longitud: this.destinoLongitud,
      idEstado: this.destinoEstado,
      idCiudad: this.destinoCiudad,
      direccion: this.destinoDireccion,
      imagen: this.destinoImagen,
      deshabilitar: true
    });
  }
  modificarDestino() {
    this.modificarformVisibility = false;
    this.formVisibility = false;
  }
  close() {
    this.currentStatus = 3;
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  highlight(dato) {
    this.selectedRowIndex = dato.id;
    this.destinoNombre = dato.nombre;
    this.destinoImagen = dato.imagen;
    this.destinoLongitud = dato.longitud;
    this.destinoEstado = dato.idEstado;
    this.destinoCiudad = dato.idCiudad;
    this.destinoCategorias = dato.categorias;
    this.destinoServicio = dato.servicios;
    this.destinoDescripcion = dato.descripcion;
    this.destinoActividad = dato.actividades;
    this.destinoDireccion = dato.direccion;
    this.destinoLatitud = dato.latitud;
  }

  soltar() {
    this.highlight(-1);
  }

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.destinos.length; index++) {
      if (this.destinos[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.destinos[index].deshabilitar = true;
      } else {
        continue;
      }
    }
    this.deshabilitarDestino(this.selectedRowIndex);
  }

  public deshabilitarDestino(documentId) {
    let data = {
      nombre: this.destinos[this.numerito].nombre,
      descripcion: this.destinos[this.numerito].descripcion,
      categorias: this.destinos[this.numerito].categorias,
      servicios: this.destinos[this.numerito].servicios,
      actividades: this.destinos[this.numerito].actividades,
      latitud: this.destinos[this.numerito].latitud,
      longitud: this.destinos[this.numerito].longitud,
      idEstado: this.destinos[this.numerito].idEstado,
      idCiudad: this.destinos[this.numerito].idCiudad,
      direccion: this.destinos[this.numerito].direccion,
      imagen: this.destinos[this.numerito].imagen,
      deshabilitar: true
    };
    this.DestinoSV.update(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newDestinoForm.setValue({
          nombre: "",
          descripcion: "",
          categorias: "",
          servicios: "",
          actividades: "",
          latitud: "",
          longitud: "",
          idEstado: "",
          idCiudad: "",
          direccion: "",
          imagen: "",
          deshabilitar: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  habilitar() {
    for (let index = 0; index < this.destinos.length; index++) {
      console.log(this.destinos[index].nombre);
      if (this.destinos[index].id == this.selectedRowIndex) {
        this.destinos[index].deshabilitar = false;
        this.numerito = index;
      } else {
        continue;
      }
    }
    this.habilitarDestino(this.selectedRowIndex);
  }

  public habilitarDestino(documentId) {
    let data = {
      nombre: this.destinos[this.numerito].nombre,
      descripcion: this.destinos[this.numerito].descripcion,
      categorias: this.destinos[this.numerito].categorias,
      servicios: this.destinos[this.numerito].servicios,
      actividades: this.destinos[this.numerito].actividades,
      latitud: this.destinos[this.numerito].latitud,
      longitud: this.destinos[this.numerito].longitud,
      idEstado: this.destinos[this.numerito].idEstado,
      idCiudad: this.destinos[this.numerito].idCiudad,
      direccion: this.destinos[this.numerito].direccion,
      imagen: this.destinos[this.numerito].imagen,
      deshabilitar: false
    };
    this.DestinoSV.update(documentId, data).then(
      () => {
        console.log("Documento modificado exitosamente!");
        this.newDestinoForm.setValue({
          nombre: "",
          descripcion: "",
          categorias: "",
          servicios: "",
          actividades: "",
          latitud: "",
          longitud: "",
          idEstado: "",
          idCiudad: "",
          direccion: "",
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

    // Add our fruit
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
}
