import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";
import { EstadosService } from "../../../../services/firebase/estados.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { format } from "url";

@Component({
  selector: "app-listar-estado",
  templateUrl: "./listar-estado.component.html",
  styleUrls: ["./listar-estado.component.scss"]
})
export class ListarEstadoComponent implements OnInit {
  estados: any[];
  nombreEstado: any;
  imagenEstado: any[];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  public documentId = null;
  public currentStatus = 1;
  public newEstadoForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    imagen: new FormControl(""),
    deshabilitar: new FormControl(true)
  });

  public editEstadoForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    imagen: new FormControl(""),
    deshabilitar: new FormControl(true)
  });

  constructor(private EstadoSV: EstadosService) {
    this.newEstadoForm.setValue({
      nombre: "",
      imagen: "",
      deshabilitar: true
    });
  }

  selectedRowIndex: any;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.EstadoSV.getAll().subscribe(estadosSnapshot => {
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
  }

  public newEstado(form, documentId = this.documentId) {
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        imagen: form.imagen,
        deshabilitar: true
      };
      this.EstadoSV.create(data).then(
        () => {
          console.log("Documento creado exitósamente!");
          this.newEstadoForm.setValue({
            nombre: "",
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

  public editEstado(form, documentId = this.selectedRowIndex) {
    if (this.currentStatus == 2) {
      let data = {
        nombre: form.nombre,
        imagen: form.imagen,
        deshabilitar: false
      };
      let editSubscribe = this.EstadoSV.update(documentId, data).then(
        () => {
          console.log("Documento modificado exitósamente!");
          this.editEstadoForm.setValue({
            nombre: "",
            imagen: "",
            deshabilitar: true
          });
          this.getData();
          this.close();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
    this.currentStatus = 1;
  }

  crearEstado() {
    this.formVisibility = false;
    this.crearformVisibility = false;
  }

  openModificar() {
    this.editEstadoForm.setValue({
      nombre: this.nombreEstado,
      imagen: this.imagenEstado,
      deshabilitar: true
    });
    this.currentStatus = 2;
    this.formVisibility = true;
    this.modificarformVisibility = true;
  }

  modificarEstado() {
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
    this.nombreEstado = dato.nombre;
    this.imagenEstado = dato.imagen;
  }

  soltar() {
    this.highlight(-1);
  }

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.estados.length; index++) {
      if (this.estados[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.estados[index].deshabilitar = true;
      } else {
        continue;
      }
    }
    this.deshabilitarEstado(this.selectedRowIndex);
  }

  deshabilitarEstado(documentId) {
    let data = {
      nombre: this.estados[this.numerito].nombre,
      imagen: this.estados[this.numerito].imagen,
      deshabilitar: true
    };
    this.EstadoSV.update(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newEstadoForm.setValue({
          nombre: "",
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
    for (let index = 0; index < this.estados.length; index++) {
      console.log(this.estados[index].nombre);
      if (this.estados[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.estados[index].deshabilitar = false;
      } else {
        continue;
      }
    }
    this.habilitarEstado(this.selectedRowIndex);
  }

  public habilitarEstado(documentId) {
    let data = {
      nombre: this.estados[this.numerito].nombre,
      imagen: this.estados[this.numerito].imagen,
      deshabilitar: false
    };
    this.EstadoSV.update(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newEstadoForm.setValue({
          nombre: "",
          imagen: "",
          deshabilitar: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }
}
