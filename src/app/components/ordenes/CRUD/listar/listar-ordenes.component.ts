import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservasService } from 'src/app/services/firebase/reservas.service';

@Component({
  selector: 'app-listar-ordenes',
  templateUrl: './listar-ordenes.component.html',
  styleUrls: ['./listar-ordenes.component.scss']
})

// const ELEMENT_DATA: destinoTuristico[] = destinos; //el JSON no tiene cambios de interface

export class ListarOrdenesComponent implements OnInit {
  public ordenes = [];
  public documentId = null;
  public currentStatus = 1;
  public newOrdenForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    cedula: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    estatus: new FormControl('', Validators.required),
    itinerario: new FormGroup({
      localizador: new FormControl('', Validators.required),
      fechaLlegada: new FormControl('', Validators.required),
      fechaSalida: new FormControl('', Validators.required),
      hotel: new FormControl('', Validators.required),
      tipoHabitacion: new FormControl('', Validators.required),
    }),
    direccion: new FormControl('', Validators.required),
    deshabilitar: new FormControl('', Validators.required)

  });
  
  constructor(private OrdenSV: ReservasService) {
    this.newOrdenForm.setValue({
      id: '',
      nombre: '',
      cedula: '',
      correo: '',
      estatus: '',
      localizador: '',
      fechaLlegada: '',
      fechaSalida: '',
      hotel: '',
      tipoHabitacion: '',
      direccion: '',
      deshabilitar: ''
    });
  }

  selectedRowIndex: number = -1;

  ngOnInit() {
    this.OrdenSV.getAll().subscribe((ordenesSnapshot) => {
      this.ordenes = [];
      ordenesSnapshot.forEach((ordenData: any) => {
        this.ordenes.push({
          id: ordenData.payload.doc.id,
          nombre: ordenData.payload.doc.data().nombre,
          cedula: ordenData.payload.doc.data().cedula,
          correo: ordenData.payload.doc.data().correo,
          estatus: ordenData.payload.doc.data().estatus,
          localizador: ordenData.payload.doc.data().localizador,
          fechaLlegada: ordenData.payload.doc.data().fechaLlegada,
          fechaSalida: ordenData.payload.doc.data().fechaSalida,
          hotel: ordenData.payload.doc.data().hotel,
          tipoHabitacion: ordenData.payload.doc.data().tipoHabitacion,
          direccion: ordenData.payload.doc.data().direccion,
          deshabilitar: ordenData.payload.doc.data().deshabilitar
        });
        console.log(this.ordenes)
      })
    });
    

  }

  public newOrden(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        cedula: form.cedula,
        correo: form.correo,
        estatus: form.estatus,
        localizador: form.localizador,
        fechaLlegada: form.fechaLlegada,
        fechaSalida: form.fechaSalida,
        hotel: form.hotel,
        tipoHabitacion: form.tipoHabitacion,
        deshabilitar: form.deshabilitar
      }
      this.OrdenSV.create(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newOrdenForm.setValue({
          nombre: '',
          cedula: '',
          correo: '',
          estatus: '',
          localizador: '',
          fechaLlegada: '',
          fechaSalida: '',
          hotel: '',
          tipoHabitacion: '',
          direccion: '',
          id: '',
          deshabilitar: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        cedula: form.cedula,
        correo: form.correo,
        estatus: form.estatus,
        localizador: form.localizador,
        fechaLlegada: form.fechaLlegada,
        fechaSalida: form.fechaSalida,
        hotel: form.hotel,
        tipoHabitacion: form.tipoHabitacion,
        direccion: form.direccion,
        deshabilitar: form.deshabilitar
      }
      this.OrdenSV.update(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newOrdenForm.setValue({
          id: '',
          nombre: '',
          cedula: '',
          correo: '',
          estatus: '',
          localizador: '',
          fechaLlegada: '',
          fechaSalida: '',
          hotel: '',
          tipoHabitacion: '',
          direccion: '',
          deshabilitar: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

  public editOrden(documentId) {
    let editSubscribe = this.OrdenSV.getReserva(documentId).subscribe((ordenData) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newOrdenForm.setValue({
        id: documentId,
        nombre: ordenData.payload.data()['nombre'],
        descripcion: ordenData.payload.data()['descripcion'],
        tipo: ordenData.payload.data()['tipo'],
        servicios:ordenData.payload.data()['servicios'],
        actividades: ordenData.payload.data()['actividades'],
        latitud: ordenData.payload.data()['latitud'],
        longitud: ordenData.payload.data()['longitud'],
        estado: ordenData.payload.data()['estado'],
        ciudad:ordenData.payload.data()['ciudad'],
        direccion: ordenData.payload.data()['direccion']
      });
      editSubscribe.unsubscribe();
    });
  }

    //@ViewChild(MatTable, { static: true }) table: MatTable<any>;

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

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
  validacion = true;
  valnombre = true;
  valtipo = true;
  valservicios = true;
  valactividades = true;
  valciudad = true;
  vallatitud = true;
  vallongitud = true;
  valdireccion = true;
  valdescripcion = true;
  valestado = true;
  selecttipo: string = '0';
  selectestado: string = '0';
  selectciudad: string = '0';
  vertipo: string = '0';
  verestado: string = '0';
  verciudad: string = '0';
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
}
