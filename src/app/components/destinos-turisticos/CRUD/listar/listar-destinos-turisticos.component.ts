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
  displayedColumns: string[] = [
    'nombre',
    'estado',
    'ciudad',
    'tipo',
    'actividades',
    'servicios',
    'latitud',
    'longitud',
    'direccion',
    'descripcion',
    'id'
  ];

  public NOUSAR = destinosJ;
  public tipoD = tipos;
  public ciudadD = ciudades;
  public estadoD = estados;

  public destinos = [];
  public documentId = null;
  public currentStatus = 1;
  public newDestinoForm = new FormGroup({
    id: new FormControl(''),
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
      id: '',
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

  selectedRowIndex: number = -1;

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
          id: '',
          deshabilitar: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
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
      this.DestinoSV.update(documentId, data).then(() => {
        this.currentStatus = 1;
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
        deshabilitar: destino.payload.data()['deshabilitar'],
      });
      editSubscribe.unsubscribe();
    });
  }

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  /*


  selectedRowIndex: number = -1;

  clearDestino() {
    this.Destino = {
      nombre: '',
      tipo: [''],
      servicios: '',
      actividades: '',
      ciudad: [''],
      latitud: '',
      longitud: '',
      direccion: '',
      descripcion: '',
      estado: [''],
      id: this.destino.length + 1,
      deshabilitar: false
    };
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
  }

  crearDestinos() {
    if (this.validacion == true) {
      if (this.Destino.nombre == "") {
        this.validacion = false;
        this.valnombre = false;
      }
      if (this.Destino.servicios == "") {
        this.validacion = false;
        this.valservicios = false;
      }
      if (this.Destino.actividades == "") {
        this.validacion = false;
        this.valactividades = false;
      }
      if (this.Destino.descripcion == "") {
        this.validacion = false;
        this.valdescripcion = false;
      }
      if (this.Destino.direccion == "") {
        this.validacion = false;
        this.valdireccion = false;
      }
      if (this.Destino.latitud == "") {
        this.validacion = false;
        this.vallatitud = false;
      }
      if (this.Destino.longitud == "") {
        this.validacion = false;
        this.vallongitud = false;
      }
      if (this.verciudad == "") {
        this.validacion = false;
        this.valciudad = false;
      }
      if (this.verestado == "") {
        this.validacion = false;
        this.valestado = false;
      }
      if (this.vertipo == "") {
        this.validacion = false;
        this.valtipo = false;
      }
      this.openCrear();
    }else{
      this.addRowData();
      this.formVisibility = false;
      this.crearformVisibility = false;
    }
  }

  addRowData() {
    destinos.push(this.Destino);
    this.clearDestino();
    this.table.renderRows();
  }

  modifyRowData() {
    this.table.renderRows();
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
    this.Destino = this.destino[this.selectedRowIndex];
  }

  close() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
    this.validacion = true;
    this.valnombre = true;
    this.valtipo = true;
    this.valservicios = true;
    this.valactividades = true;
    this.valciudad = true;
    this.vallatitud = true;
    this.vallongitud = true;
    this.valdireccion = true;
    this.valdescripcion = true;
    this.valestado = true;
  }

  modificar() {
    this.destino[this.selectedRowIndex].nombre = this.Destino.nombre;
    this.destino[this.selectedRowIndex].estado = this.Destino.estado;
    this.destino[this.selectedRowIndex].ciudad = this.Destino.ciudad;
    this.destino[this.selectedRowIndex].tipo = this.Destino.tipo;
    this.destino[this.selectedRowIndex].actividades = this.Destino.actividades;
    this.destino[this.selectedRowIndex].servicios = this.Destino.servicios;
    this.destino[this.selectedRowIndex].latitud = this.Destino.latitud;
    this.destino[this.selectedRowIndex].longitud = this.Destino.longitud;
    this.destino[this.selectedRowIndex].direccion = this.Destino.direccion;
    this.destino[this.selectedRowIndex].descripcion = this.Destino.descripcion;
  }

  modificarDestinos() {
    this.modifyRowData();
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
    this.modificar();
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  deshabilitar() {
    destinos[this.selectedRowIndex].deshabilitar = true;
  }
  habilitar() {
    destinos[this.selectedRowIndex].deshabilitar = false;
  }

  capturarTipo() {
    this.vertipo = this.selecttipo;
  }
  capturarEstado() {
    this.verestado = this.selectestado;
  }
  capturarCiudad() {
    this.verciudad = this.selectciudad;
  } */
}
