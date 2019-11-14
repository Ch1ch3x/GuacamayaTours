import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material';

import ciudades from "../../../../data/ciudades.json";
import { ciudad } from "../../../../interfaces/ciudad";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CiudadesService } from 'src/app/services/firebase/ciudades.service.js';
import { EstadosService } from 'src/app/services/firebase/estados.service.js';

const ELEMENT_DATA: ciudad[] = ciudades;

@Component({
  selector: 'app-lista-ciudad',
  templateUrl: './lista-ciudad.component.html',
  styleUrls: ['./lista-ciudad.component.scss']
})
export class ListaCiudadComponent {

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = [
    'nombre',
    'estado',
    'imagen',
  ];
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

    nombre: new FormControl('', Validators.required),
    idEstado: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    imagen2: new FormControl(''),
    imagen3: new FormControl(''),
    deshabilitar: new FormControl(true)

  });

  constructor(private CiudadSV: CiudadesService, private EstadosSV: EstadosService) {
    this.newCiudadForm.setValue({
      nombre: '',
      idEstado: '',
      imagen: '',
      imagen2: '',
      imagen3: '',
      deshabilitar: true,
    });
  }

  ngOnInit() {
    this.EstadosSV.getAll().subscribe((estadosSnapshot) => {
      this.estados = [];
      estadosSnapshot.forEach((estadoData: any) => {
        this.estados.push({
          id: estadoData.payload.doc.data(),
          nombre: estadoData.payload.doc.data().nombre,
          imagen: estadoData.payload.doc.data().imagen,
          imagen2: estadoData.payload.doc.data().imagen2,
          imagen3: estadoData.payload.doc.data().imagen3,
          deshabilitar: estadoData.payload.doc.data().deshabilitar,
        });
      })
    });
    this.CiudadSV.getAll().subscribe((ciudadesSnapshot) => {
      this.ciudades = [];
      ciudadesSnapshot.forEach((ciudadData: any) => {
        this.ciudades.push({
          id: ciudadData.payload.doc.data(),
          nombre: ciudadData.payload.doc.data().nombre,
          idEstado: ciudadData.payload.doc.data().idEstado,
          imagen: ciudadData.payload.doc.data().imagen,
          imagen2: ciudadData.payload.doc.data().imagen2,
          imagen3: ciudadData.payload.doc.data().imagen3,
          deshabilitar: ciudadData.payload.doc.data().deshabilitar
        });
      })
      console.log(this.ciudades);
    });
  }
    public newCiudad(form, documentID = this.documentId) {
      console.log(`Status: ${this.currentStatus}`);
      if (this.currentStatus == 1) {
        let data = {
          nombre: form.nombre,
          idEstado: form.idEstado,
          imagen: form.imagen,
          imagen2: form.imagen2,
          imagen3: form.imagen3,
          deshabilitar: form.deshabilitar
        }
        this.CiudadSV.create(data).then(() => {
          console.log('Documento creado exitósamente!');
          this.newCiudadForm.setValue({
            nombre: '',
            idEstado: '',
            imagen: '',
            imagen2: '',
            imagen3: '',

            deshabilitar: true,
          });
        }, (error) => {
          console.error(error);
        });
      } else {
        this.close();
      }
    }

    public editCiudad(documentId) {
      let editSubscribe = this.CiudadSV.getCiudad(documentId).subscribe((ciudad) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newCiudadForm.setValue({
          id: documentId,
          nombre: ciudad.payload.data()['nombre'],
          idEstado: ciudad.payload.data()['estado'],
          imagen: ciudad.payload.data()['imagen'],
          imagen2: ciudad.payload.data()['imagen2'],
          imagen3: ciudad.payload.data()['imagen3'],
          deshabilitar: ciudad.payload.data()['deshabilitar'],
        });
        editSubscribe.unsubscribe();
      });
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

  deshabilitar() {
    ciudades[this.selectedRowIndex].deshabilitar = true;
  }
  habilitar() {
    ciudades[this.selectedRowIndex].deshabilitar = false;
  }
}
