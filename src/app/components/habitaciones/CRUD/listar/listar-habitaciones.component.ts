import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoHabitacionService } from 'src/app/services/firebase/tipo-habitacion.service';
import { HotelesService } from 'src/app/services/firebase/hoteles.service';

@Component({
  selector: 'app-listar-habitaciones',
  templateUrl: './listar-habitaciones.component.html',
  styleUrls: ['./listar-habitaciones.component.scss']
})
export class ListarHabitacionesComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = [
    'nombre',
    'hotel',
    'descripcion',
    'comodidades',
    'imagen',
    'max',
    'vista'
  ];
 // dataSource = ELEMENT_DATA;


 // @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  selectedRowIndex: number = -1;

  public hoteles = [];
  public tipoHabitaciones = [];
  public documentId = null;
  public currentStatus = 1;
  public newHabitacionForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    idHotel: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    max: new FormControl('', Validators.required),
    vista: new FormControl('', Validators.required),
    comodidades: new FormControl('', Validators.required),
    deshabilitar: new FormControl(true),

  });

  constructor(private tipoHabitacionSV: TipoHabitacionService, private HotelSV: HotelesService) {
    this.newHabitacionForm.setValue({
      nombre: '',
      idHotel: '',
      descripcion: '',
      imagen: '',
      max:'',
      vista:'',
      comodidades:'',
      deshabilitar: true
    });
  }

  ngOnInit() {
    this.tipoHabitacionSV.getAll().subscribe((tipoHabitacionSnapshot) => {
      this.tipoHabitaciones = [];
      tipoHabitacionSnapshot.forEach((ciudadData: any) => {
        this.tipoHabitaciones.push({
          id: ciudadData.payload.doc.data(),
          nombre: ciudadData.payload.doc.data().nombre,
          idHotel: ciudadData.payload.doc.data().idHotel,
          comodidades: ciudadData.payload.doc.data().comodidades,
          descripcion: ciudadData.payload.doc.data().descripcion,
          max: ciudadData.payload.doc.data().max,
          imagen: ciudadData.payload.doc.data().imagen,
          vista: ciudadData.payload.doc.data().vista,
          deshabilitar: ciudadData.payload.doc.data().deshabilitar
        });
      })
    });
    this.HotelSV.getAll().subscribe((hotelesSnapshot) => {
      this.hoteles = [];
      hotelesSnapshot.forEach((ordenData: any) => {
        this.hoteles.push({
          id: ordenData.payload.doc.id,
          nombre: ordenData.payload.doc.data().nombre,
          estrellas: ordenData.payload.doc.data().estrellas,
          servicios: ordenData.payload.doc.data().servicios,
          latitud: ordenData.payload.doc.data().latitud,
          longitud: ordenData.payload.doc.data().longitud,
          idEstado: ordenData.payload.doc.data().idEstado,
          idCiudad: ordenData.payload.doc.data().idCiudad,
          direccion: ordenData.payload.doc.data().direccion,
          /* costoFullday: ordenData.payload.doc.data().fullday.costo,
          activoFullday: ordenData.payload.doc.data().fullday.activo, */
          imagen: ordenData.payload.doc.data().imagen,
          deshabilitar: ordenData.payload.doc.data().deshabilitar
        });
      })
    });
  }
    public newHabitacion(form, documentId = this.documentId) {
      console.log(`Status: ${this.currentStatus}`);
      if (this.currentStatus == 1) {
        let data = {
          nombre: form.nombre,
          idHotel: form.idHotel,
          max: form.max,
          comodidades: form.comodidades,
          descripcion: form.descripcion,
          vista: form.vista,
          imagen: form.imagen,
          deshabilitar: form.deshabilitar
        }
        this.tipoHabitacionSV.create(data).then(() => {
          console.log('Documento creado exitósamente!');
          this.newHabitacionForm.setValue({
            nombre: '',
            idHotel: '',
            max: '',
            imagen: '',
            comodidades: '',
            descripcion: '',
            vista:'',
            deshabilitar: ''
          });
        }, (error) => {
          console.error(error);
        });
      } else {
        this.close();
      }
    }

    public editHabitacion(documentId) {
      let editSubscribe = this.tipoHabitacionSV.getHabitacion(documentId).subscribe((habitacion) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newHabitacionForm.setValue({
          id: documentId,
          nombre: habitacion.payload.data()['nombre'],
          idHotel: habitacion.payload.data()['idHotel'],
          imagen: habitacion.payload.data()['imagen'],
          comodidades: habitacion.payload.data()['comodidades'],
          descripcion: habitacion.payload.data()['descripcion'],
          max: habitacion.payload.data()['max'],
          deshabilitar: habitacion.payload.data()['deshabilitar'],
        });
        editSubscribe.unsubscribe();
      });
    }


  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
    this.currentStatus = 1;
  }

  crearHabitacion() {
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

  modificarHabitacion() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  highlight(dato) {
    this.selectedRowIndex = dato.id;
  }

  deshabilitar() {
    for (let index = 0; index < this.tipoHabitaciones.length; index++) {
      if (this.tipoHabitaciones[index].id == this.selectedRowIndex) {
        this.tipoHabitaciones[index].deshabilitar = false;
      } else {
        continue;
      }
    }
  }

  habilitar() {
    for (let index = 0; index < this.tipoHabitaciones.length; index++) {
      console.log(this.tipoHabitaciones[index].nombre);
      if (this.tipoHabitaciones[index].id == this.selectedRowIndex){
        this.tipoHabitaciones[index].deshabilitar = true;
      } else {
        continue;
      }
    }
  }

}
