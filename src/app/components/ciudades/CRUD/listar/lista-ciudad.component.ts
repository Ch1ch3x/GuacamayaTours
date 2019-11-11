import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material';

import ciudades from "../../../../data/ciudades.json";
import { ciudad } from "../../../../interfaces/ciudad";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CiudadesService } from 'src/app/services/firebase/ciudades.service.js';

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

  public Ciudad: ciudad = {
    id: 0,
    nombre: '',
    estado: '',
    imagen: '',
    deshabilitar: false
  };


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  selectedRowIndex: number = -1;

  public ciudades = [];
  public documentId = null;
  public currentStatus = 1;
  public newCiudadForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    imagen2: new FormControl('', Validators.required),
    imagen3: new FormControl('', Validators.required),
    deshabilitar: new FormControl('', Validators.required)

  });

  constructor(private CiudadSV: CiudadesService) {
    this.newCiudadForm.setValue({
      id: '',
      nombre: '',
      estado: '',
      imagen: '',
      imagen2: '',
      imagen3: '',
      deshabilitar: ''
    });
  }

  ngOnInit() {
    this.CiudadSV.getAll().subscribe((ciudadesSnapshot) => {
      this.ciudades = [];
      ciudadesSnapshot.forEach((ciudadData: any) => {
        this.ciudades.push({
          id: ciudadData.payload.doc.data(),
          nombre: ciudadData.payload.doc.data().nombre,
          estado: ciudadData.payload.doc.data().estado,
          imagen: ciudadData.payload.doc.data().imagen,
          imagen2: ciudadData.payload.doc.data().imagen2,
          imagen3: ciudadData.payload.doc.data().imagen3,
          deshabilitar: ciudadData.payload.doc.data().deshabilitar
        });
        console.log(this.ciudades)
      })
    });
  }
    public newCiudad(form, documentId = this.documentId) {
      console.log(`Status: ${this.currentStatus}`);
      if (this.currentStatus == 1) {
        let data = {
          nombre: form.nombre,
          estado: form.estado,
          imagen: form.imagen,
          imagen2: form.imagen2,
          imagen3: form.imagen3,
          deshabilitar: form.deshabilitar
        }
        this.CiudadSV.create(data).then(() => {
          console.log('Documento creado exitósamente!');
          this.newCiudadForm.setValue({
            nombre: '',
            estado: '',
            imagen: '',
            imagen2: '',
            imagen3: '',
            id: '',
            deshabilitar: ''
          });
        }, (error) => {
          console.error(error);
        });
      } else {
        let data = {
          nombre: form.nombre,
          estado: form.estado,
          imagen: form.imagen,
          imagen2: form.imagen2,
          imagen3: form.imagen3,
          deshabilitar: form.deshabilitar
        }
        this.CiudadSV.update(documentId, data).then(() => {
          this.currentStatus = 1;
          this.newCiudadForm.setValue({
            nombre: '',
            estado: '',
            deshabilitar: '',
            imagen:'',
            imagen2: '',
            imagen3: '',
            id: ''
          });
          console.log('Documento editado exitósamente');
        }, (error) => {
          console.log(error);
        });
      }
    }

    public editCiudad(documentId) {
      let editSubscribe = this.CiudadSV.getCiudad(documentId).subscribe((ciudad) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newCiudadForm.setValue({
          id: documentId,
          nombre: ciudad.payload.data()['nombre'],
          estado: ciudad.payload.data()['estado'],
          imagen: ciudad.payload.data()['imagen'],
          imagen2: ciudad.payload.data()['imagen2'],
          imagen3: ciudad.payload.data()['imagen3'],
          desabilitar: ciudad.payload.data()['desabilitar'],
        });
        editSubscribe.unsubscribe();
      });
    }

  clearCiudad() {
   /* this.Ciudad = {
      nombre: '',
      estado: '',
      imagen: '',
      deshabilitar: false,
      id: this.ciudad.length,
    }; */
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
  }

  crearCiudad() {
    this.addRowData();
    this.formVisibility = false;
    this.crearformVisibility = false;
  }

  addRowData() {
    ciudades.push(this.Ciudad);
    this.clearCiudad();
    this.table.renderRows();
  }

  modifyRowData() {
    this.table.renderRows();
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
  }

  close() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  modificarCiudad() {
    this.modifyRowData();
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  deshabilitar() {
    ciudades[this.selectedRowIndex].deshabilitar = true;
  }
  habilitar() {
    ciudades[this.selectedRowIndex].deshabilitar = false;
  }

}
