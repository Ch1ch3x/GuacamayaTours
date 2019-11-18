import { Component } from "@angular/core";

import { MatTable } from "@angular/material";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CiudadesService } from "src/app/services/firebase/ciudades.service.js";
import { EstadosService } from "src/app/services/firebase/estados.service.js";


@Component({
  selector: "app-lista-ciudad",
  templateUrl: "./lista-ciudad.component.html",
  styleUrls: ["./lista-ciudad.component.scss"]
})
export class ListaCiudadComponent {
  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  selectedRowIndex: any;

  public ciudades = [];
  public estados = [];
  public documentId = null;
  public currentStatus = 1;
  public newCiudadForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    idEstado: new FormControl("", Validators.required),
    imagen: new FormControl("", Validators.required),
    deshabilitar: new FormControl(true)
  });

  constructor(
    private CiudadSV: CiudadesService,
    private EstadosSV: EstadosService
  ) {
    this.newCiudadForm.setValue({
      nombre: "",
      idEstado: "",
      imagen: "",
      deshabilitar: true
    });
  }

  ngOnInit() {
    this.EstadosSV.getAll().subscribe(estadosSnapshot => {
      this.estados = [];
      estadosSnapshot.docs.forEach(estadoData => {
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
      ciudadesSnapshot.docs.forEach(ciudadData => {
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
  public newCiudad(form, documentID = this.documentId) {
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        idEstado: form.idEstado,
        imagen: form.imagen,
        deshabilitar: form.deshabilitar
      };
      this.CiudadSV.create(data).then(
        () => {
          console.log("Documento creado exitósamente!");
          this.newCiudadForm.setValue({
            nombre: "",
            idEstado: "",
            imagen: "",
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

  public editCiudad(documentId) {
    let editSubscribe = this.CiudadSV.getCiudad(documentId).subscribe(
      ciudad => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newCiudadForm.setValue({
          id: documentId,
          nombre: ciudad.payload.data()["nombre"],
          idEstado: ciudad.payload.data()["estado"],
          imagen: ciudad.payload.data()["imagen"],
          deshabilitar: ciudad.payload.data()["deshabilitar"]
        });
        editSubscribe.unsubscribe();
      }
    );
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
    this.currentStatus = 1;
  }

  crearCiudad() {
    this.formVisibility = false;
    this.crearformVisibility = false;
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
    const ciudad = this.ciudades.filter(
      ciudad => ciudad.id === this.selectedRowIndex
    )[0];
    console.log(ciudad);
    this.newCiudadForm.setValue({
      nombre: ciudad["nombre"],
      idEstado: ciudad["idEstado"],
      imagen: ciudad["imagen"] ? ciudad["imagen"] : "",
      imagen2: ciudad["imagen2"] ? ciudad["imagen2"] : "",
      imagen3: ciudad["imagen3"] ? ciudad["imagen3"] : "",
      deshabilitar: ciudad["deshabilitar"]
    });
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
    for (let index = 0; index < this.ciudades.length; index++) {
      if (this.ciudades[index].id == this.selectedRowIndex) {
        this.ciudades[index].deshabilitar = false;
      } else {
        continue;
      }
    }
  }

  habilitar() {
    for (let index = 0; index < this.ciudades.length; index++) {
      console.log(this.ciudades[index].nombre);
      if (this.ciudades[index].id == this.selectedRowIndex) {
        this.ciudades[index].deshabilitar = true;
      } else {
        continue;
      }
    }
  }
}
