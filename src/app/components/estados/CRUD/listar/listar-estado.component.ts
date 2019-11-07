import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";
import estados from "../../../../data/estados.json";
import { estado } from "../../../../interfaces/estado";
import {EstadosService} from "../../../../services/firebase/estados.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

const ELEMENT_DATA: estado[] = estados;

@Component({
  selector: "app-listar-estado",
  templateUrl: "./listar-estado.component.html",
  styleUrls: ["./listar-estado.component.scss"]
})
export class ListarEstadoComponent implements OnInit {
  displayedColumns: string[] = ["nombre", "id", "imagen", "deshabilitado"] ;
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  formVisibility = false;
  public estados = [];
  public documentId = null;
  public currentStatus = 1;
  public newEstadoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      id: new FormControl(''),
      imagen: new FormControl(''),
      deshabilitar: new FormControl('')
    });


  constructor(private EstadoSV: EstadosService) {
    this.newEstadoForm.setValue({
      nombre: '',
      id: '',
      imagen: '',
      deshabilitar: ''
    });
  }

  selectedRowIndex: number = -1;

  ngOnInit() {
    this.EstadoSV.getAll().subscribe((estadosSnapshot) => {
      this.estados = [];
      estadosSnapshot.forEach((estadoData: any) => {
        this.estados.push({
          id: estadoData.payload.doc.id,
          nombre: estadoData.payload.doc.data().nombre,
          imagen: estadoData.payload.doc.data().imagen,
          deshabilitar: estadoData.payload.doc.data().deshabilitar
        });
        console.log(this.estados)
      })
    });
    

  }

  public newEstado(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        imagen: form.imagen,
        deshabilitar: form.deshabilitar
      }
      this.EstadoSV.create(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newEstadoForm.setValue({
          nombre: '',
          imagen: '',
          id: '',
          deshabilitar: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        imagen: form.imagen,
        deshabilitar: form.deshabilitar
      }
      this.EstadoSV.update(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newEstadoForm.setValue({
          nombre: '',
          deshabilitar: '',
          imagen:'',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

  public editEstado(documentId) {
    let editSubscribe = this.EstadoSV.getEstado(documentId).subscribe((estado) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newEstadoForm.setValue({
        id: documentId,
        nombre: estado.payload.data()['nombre'],
        imagen: estado.payload.data()['imagen'],
        desabilitar: estado.payload.data()['desabilitar'],
      });
      editSubscribe.unsubscribe();
    });
  }
  clearEstado() {
  }

  openCrear() {
  }

  crearEstado() {
    this.addRowData();
    this.formVisibility = false;
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  deshabilitar() {
    estados[this.selectedRowIndex].deshabilitar = true;
  }
  habilitar() {
    estados[this.selectedRowIndex].deshabilitar = false;
  }
  addRowData() {
    this.clearEstado();
    this.table.renderRows();
  }

  modifyRowData() {
    estados.push();
    this.clearEstado();
    this.table.renderRows();
  }

  openModificar() {
  //  this.formVisibility = true;
  }

  modificarEstado() {
    this.modifyRowData();
   // this.formVisibility = false;
  }
}
