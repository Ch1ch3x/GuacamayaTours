import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";
import { EstadosService } from "../../../../services/firebase/estados.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { format } from 'url';


@Component({
  selector: "app-listar-estado",
  templateUrl: "./listar-estado.component.html",
  styleUrls: ["./listar-estado.component.scss"]
})
export class ListarEstadoComponent implements OnInit {
  estados: any[];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  public documentId = null;
  public currentStatus = 1;
  public newEstadoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
      imagen2: new FormControl(''),
      imagen3: new FormControl(''),
      deshabilitar: new FormControl(true),

    });


  constructor(private EstadosSV: EstadosService) {
    this.newEstadoForm.setValue({
      nombre: '',
      imagen: '',
      imagen2: '',
      imagen3: '',
      deshabilitar: true,
    });
  }

  selectedRowIndex: number = -1;

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
  }

  public newEstado(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        imagen: form.imagen,
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: form.deshabilitar
      }
      this.EstadosSV.create(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newEstadoForm.setValue({
          nombre: '',
          imagen: '',
          imagen2: '',
          imagen3: '',
          deshabilitar: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      this.close();
    }
  }

  public editEstado(documentId) {
    let editSubscribe = this.EstadosSV.getEstado(documentId).subscribe((estado) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newEstadoForm.setValue({
        nombre: estado.payload.data()['nombre'],
        imagen: estado.payload.data()['imagen'],
        imagen2: estado.payload.data()['imagen2'],
        imagen3: estado.payload.data()['imagen3'],
        deshabilitar: estado.payload.data()['deshabilitar'],
      });
      editSubscribe.unsubscribe();
    });
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
    this.highlight(-1)
  }

  deshabilitar() {
    for (let index = 0; index < this.estados.length; index++) {
      if (this.estados[index].id == this.selectedRowIndex) {
        this.estados[index].deshabilitar = false;
      } else {
        continue;
      }
    }
  }

  habilitar() {
    for (let index = 0; index < this.estados.length; index++) {
      console.log(this.estados[index].nombre);
      if (this.estados[index].id == this.selectedRowIndex){
        this.estados[index].deshabilitar = true;
      } else {
        continue;
      }
    }
  }

  openModificar() {
  //  this.formVisibility = true;
  }

  modificarEstado() {
  }
}
