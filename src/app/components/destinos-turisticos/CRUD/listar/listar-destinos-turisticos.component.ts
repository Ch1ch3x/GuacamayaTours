import { Component, ViewChild, OnInit } from '@angular/core';

import { MatTable } from '@angular/material';
// necesito conectar tipos,ciuades,estados
import destinosJ from '../../../../data/destinos.json';
import tipos from '../../../../data/tipos.json';
import ciudades from '../../../../data/ciudades.json';
import estados from '../../../../data/estados.json';
import { destinoTuristico } from '../../../../interfaces/destinoTuristico';
import { tipo } from '../../../../interfaces/tipo';
import { ciudad } from '../../../../interfaces/ciudad';
import { estado } from '../../../../interfaces/estado';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DestinosService} from '../../../../services/firebase/destinos.service';

// const ELEMENT_DATA: destinoTuristico[] = destinos; //el JSON no tiene cambios de interface


@Component({
  selector: 'app-listar-destinos-turisticos',
  templateUrl: './listar-destinos-turisticos.component.html',
  styleUrls: ['./listar-destinos-turisticos.component.scss']
})
export class ListarDestinosTuristicosComponent implements OnInit {
  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
 // dataSource = ELEMENT_DATA;
  // tslint:disable-next-line: max-line-length
  selectedRowIndex: any;

  public NOUSAR = destinosJ;
  public tipoD = tipos;
  public ciudadD = ciudades;
  public estadoD = estados;

  public destinos = [];
  public documentId = null;
  public currentStatus = 1;
  public newDestinoForm = new FormGroup({

    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    servicios: new FormControl('', Validators.required),
    actividades: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    ciudad:new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    imagen2: new FormControl(''),
    imagen3: new FormControl(''),
    deshabilitar: new FormControl('', Validators.required)

  });


  constructor(private DestinoSV: DestinosService) {
    this.newDestinoForm.setValue({

      nombre: '',
      descripcion: '',
      tipo: '',
      servicios: '',
      actividades: '',
      latitud: '',
      longitud: '',
      direccion: '',
      estado: '',
      ciudad: '',
      imagen: '',
      imagen2: '',
      imagen3: '',
      deshabilitar: ''
    });
  }


  ngOnInit() {
    this.DestinoSV.getAll().subscribe((destinosSnapshot) => {
      this.destinos = [];
      destinosSnapshot.forEach((destinoData: any) => {
        this.destinos.push({
          id: destinoData.payload.doc.id,
          nombre: destinoData.payload.doc.data().nombre,
          descripcion: destinoData.payload.doc.data().descripcion,
          tipo:destinoData.payload.doc.data().tipo,
          servicios: destinoData.payload.doc.data().servicios,
          actividades: destinoData.payload.doc.data().actividades,
          latitud: destinoData.payload.doc.data().latitud,
          longitud: destinoData.payload.doc.data().longitud,
          estado: destinoData.payload.doc.data().estado,
          ciudad: destinoData.payload.doc.data().ciudad,
          direccion: destinoData.payload.doc.data().direccion,
          imagen: destinoData.payload.doc.data().imagen,
          imagen2: destinoData.payload.doc.data().imagen2,
          imagen3: destinoData.payload.doc.data().imagen3,
          deshabilitar: destinoData.payload.doc.data().deshabilitar
        });
        console.log(this.destinos)
      })
    });


  }

  public newDestino(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        tipo: form.tipo,
        servicios: form.servicios,
        actividades: form.actividades,
        latitud: form.latitud,
        longitud: form.longitud,
        estado: form.estado,
        ciudad: form.ciudad,
        direccion: form.direccion,
        imagen: form.imagen,
        imagen2: form.imagen2,
        imagen3: form.imagen3,
        deshabilitar: form.deshabilitar
      }
      this.DestinoSV.create(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newDestinoForm.setValue({
          nombre: '',
          descripcion: '',
          tipo: '',
          servicios: '',
          actividades: '',
          latitud: '',
          longitud: '',
          estado: '',
          ciudad: '',
          direccion: '',
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

  public editDestino(documentId) {
    let editSubscribe = this.DestinoSV.getDestino(documentId).subscribe((destino) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newDestinoForm.setValue({
        id: documentId,
        nombre: destino.payload.data()['nombre'],
        descripcion: destino.payload.data()['descripcion'],
        tipo: destino.payload.data()['tipo'],
        servicios:destino.payload.data()['servicios'],
        actividades: destino.payload.data()['actividades'],
        latitud: destino.payload.data()['latitud'],
        longitud: destino.payload.data()['longitud'],
        estado: destino.payload.data()['estado'],
        ciudad: destino.payload.data()['ciudad'],
        direccion: destino.payload.data()['direccion'],
        imagen: destino.payload.data()['imagen'],
        imagen2: destino.payload.data()['imagen2'],
        imagen3: destino.payload.data()['imagen3'],
        desabilitar: destino.payload.data()['desabilitar'],
      });
      editSubscribe.unsubscribe();
    });
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

  close() {
    this.currentStatus = 3;
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  highlight(dato) {
    this.selectedRowIndex = dato.id;
  }
}
