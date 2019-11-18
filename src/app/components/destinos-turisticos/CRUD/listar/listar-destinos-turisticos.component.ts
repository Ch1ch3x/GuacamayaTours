import { Component, ViewChild, OnInit } from "@angular/core";

import { MatTable } from "@angular/material";
// necesito conectar tipos,ciuades,estados
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DestinosService } from "../../../../services/firebase/destinos.service";
import { CiudadesService } from "src/app/services/firebase/ciudades.service.js";
import { EstadosService } from "src/app/services/firebase/estados.service.js";

// const ELEMENT_DATA: destinoTuristico[] = destinos; //el JSON no tiene cambios de interface

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
  public ciudades = [];
  public estados = [];
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
    imagen2: new FormControl(""),
    imagen3: new FormControl(""),
    deshabilitar: new FormControl(true)
  });

  constructor(
    private DestinoSV: DestinosService,
    private CiudadSV: CiudadesService,
    private EstadosSV: EstadosService
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
      imagen2: "",
      imagen3: "",
      deshabilitar: true
    });
  }

  ngOnInit() {
    this.DestinoSV.getAll().subscribe(destinosSnapshot => {
      this.destinos = [];
      destinosSnapshot.docs.forEach((destinoData: any) => {
        this.destinos.push({
          id: destinoData.id,
          nombre: destinoData.data().nombre,
          descripcion: destinoData.data().descripcion,
          categorias: destinoData.data().categorias,
          servicios: destinoData.data().servicios,
          actividades: destinoData
            .data()
            .actividades.map(actividad => actividad.nombre),
          latitud: destinoData.data().latitud,
          longitud: destinoData.data().longitud,
          idEstado: destinoData.data().idEstado,
          idCiudad: destinoData.data().idCiudad,
          direccion: destinoData.data().direccion,
          imagen: destinoData.data().imagen,
          imagen2: destinoData.data().imagen2,
          imagen3: destinoData.data().imagen3,
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
  }

  public newDestino(form, documentId = this.documentId) {
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
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: true
      };
      this.DestinoSV.create(data).then(
        () => {
          console.log("Documento creado exitósamente!");
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
            imagen2: "",
            imagen3: "",

            deshabilitar: true
          });
        },
        error => {
          console.error(error);
        }
      );

      this.destinos.push(data);
  }

  public editDestino(form, documentId) {
    let editSubscribe = this.DestinoSV.getDestino(documentId).subscribe(
      destino => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newDestinoForm.setValue({
          id: documentId,
          nombre: destino.payload.data()["nombre"],
          descripcion: destino.payload.data()["descripcion"],
          categorias: destino.payload.data()["categorias"],
          servicios: destino.payload.data()["servicios"],
          actividades: destino.payload.data()["actividades"],
          latitud: destino.payload.data()["latitud"],
          longitud: destino.payload.data()["longitud"],
          idEstado: destino.payload.data()["idEstado"],
          idCiudad: destino.payload.data()["ciudad"],
          direccion: destino.payload.data()["direccion"],
          imagen: destino.payload.data()["imagen"],
          imagen2: destino.payload.data()["imagen2"],
          imagen3: destino.payload.data()["imagen3"],
          deshabilitar: destino.payload.data()["deshabilitar"]
        });
        editSubscribe.unsubscribe();
      }
    );
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
    console.log(this.selectedRowIndex)
    this.formVisibility = true;
    this.modificarformVisibility = true;
    this.currentStatus = 2
  }
  modificarDestino(){
    this.editDestino(this.newDestinoForm, this.selectedRowIndex)
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
  }

  soltar() {
    this.highlight(-1);
  }

  deshabilitar() {
    for (let index = 0; index < this.destinos.length; index++) {
      if (this.destinos[index].id == this.selectedRowIndex) {
        this.destinos[index].deshabilitar = false;
      } else {
        continue;
      }
    }
    this.deshabilitarDestino(this.selectedRowIndex)
  }

  public deshabilitarDestino(documentId) {
    let editSubscribe = this.DestinoSV.getDestino(documentId).subscribe(
      destino => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newDestinoForm.setValue({
          id: documentId,
          nombre: destino.payload.data()["nombre"],
          descripcion: destino.payload.data()["descripcion"],
          categorias: destino.payload.data()["categorias"],
          servicios: destino.payload.data()["servicios"],
          actividades: destino.payload.data()["actividades"],
          latitud: destino.payload.data()["latitud"],
          longitud: destino.payload.data()["longitud"],
          idEstado: destino.payload.data()["idEstado"],
          idCiudad: destino.payload.data()["ciudad"],
          direccion: destino.payload.data()["direccion"],
          imagen: destino.payload.data()["imagen"],
          imagen2: destino.payload.data()["imagen2"],
          imagen3: destino.payload.data()["imagen3"],
          deshabilitar: false,
        });
        editSubscribe.unsubscribe();
      }
    );
  }

  habilitar() {
    for (let index = 0; index < this.destinos.length; index++) {
      console.log(this.destinos[index].nombre);
      if (this.destinos[index].id == this.selectedRowIndex) {
        this.destinos[index].deshabilitar = true;
      } else {
        continue;
      }
    }
  }
}
