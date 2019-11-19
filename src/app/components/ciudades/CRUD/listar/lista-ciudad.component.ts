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

    this.ciudades.push(data);
  }

  public editCiudad(form, documentId = this.selectedRowIndex) {
    if (this.currentStatus == 2) {
      let data = {
        nombre: form.nombre,
        idEstado: form.idEstado,
        imagen: form.imagen,
        deshabilitar: true,
      } 
      this.CiudadSV.update(documentId, data).then(() => {
        console.log('Documento modificado exitósamente!');
        this.newCiudadForm.setValue({
          nombre: '',
          idEstado: '',
          imagen: '',
          deshabilitar: true
        });
      }, (error) => {
        console.error(error);
      });
    }
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
    this.currentStatus = 2;
    this.formVisibility = true;
    this.modificarformVisibility = true;
  }

  modificarCiudad() {
    this.formVisibility = false;
    this.modificarformVisibility = false;
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

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.ciudades.length; index++) {
      if (this.ciudades[index].id == this.selectedRowIndex) {
        this.numerito = index
        this.ciudades[index].deshabilitar = false;
      } else {
        continue;
      }
    }
    this.deshabilitarCiudad(this.selectedRowIndex)
  }

  public deshabilitarCiudad(documentId) {
    let data = {
      nombre: this.ciudades[this.numerito].nombre,
      idEstado: this.ciudades[this.numerito].idEstado,
      imagen: this.ciudades[this.numerito].imagen,
      deshabilitar: false,
    }
    this.CiudadSV.update(documentId, data).then(() => {
      console.log('Documento modificado exitósamente!');
      this.newCiudadForm.setValue({
      nombre: '',
      idEstado: '',
      imagen: '',
      deshabilitar: true,
      });
    }, (error) => {
        console.error(error);
    });
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
    this.habilitarCiudad(this.selectedRowIndex)
  }
  

  public habilitarCiudad(documentId) {
    let data = {
      nombre: this.ciudades[this.numerito].nombre,
      idEstado: this.ciudades[this.numerito].idEstado,
      imagen: this.ciudades[this.numerito].imagen,
      deshabilitar: true,
    }
    this.CiudadSV.update(documentId, data).then(() => {
      console.log('Documento modificado exitósamente!');
      this.newCiudadForm.setValue({
      nombre: '',
      idEstado: '',
      imagen: '',
      deshabilitar: true,
      });
    }, (error) => {
        console.error(error);
    });
  }
}

  