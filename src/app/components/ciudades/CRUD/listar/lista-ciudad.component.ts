import { Component, ViewChild } from "@angular/core";

import { MatTable } from "@angular/material";

import ciudades from "../../../../data/ciudades.json";
import { ciudad } from "../../../../interfaces/ciudad";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CiudadesService } from "src/app/services/firebase/ciudades.service.js";
import { EstadosService } from "src/app/services/firebase/estados.service.js";

const ELEMENT_DATA: ciudad[] = ciudades;

@Component({
  selector: "app-lista-ciudad",
  templateUrl: "./lista-ciudad.component.html",
  styleUrls: ["./lista-ciudad.component.scss"]
})
export class ListaCiudadComponent {
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ["nombre", "estado", "imagen"];
  dataSource = ELEMENT_DATA;

  // public ciudad = ciudades;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

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
    imagen2: new FormControl(""),
    imagen3: new FormControl(""),
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
      imagen2: "",
      imagen3: "",
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
          imagen2: estadoData.data().imagen2,
          imagen3: estadoData.data().imagen3,
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
          imagen2: ciudadData.data().imagen2,
          imagen3: ciudadData.data().imagen3,
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
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: form.deshabilitar
      };
      this.CiudadSV.create(data).then(
        () => {
          console.log("Documento creado exitósamente!");
          this.newCiudadForm.setValue({
            nombre: "",
            idEstado: "",
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
          imagen2: ciudad.payload.data()["imagen2"],
          imagen3: ciudad.payload.data()["imagen3"],
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
