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

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  selectedRowIndex: number = -1;

  public tipoHabitaciones = [];
  public documentId = null;
  public currentStatus = 1;
  public newHabitacionForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
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
      tipoHabitacionSnapshot.docs.forEach((ciudadData: any) => {
        this.tipoHabitaciones.push({
          id: ciudadData.id,
          nombre: ciudadData.data().nombre,
          comodidades: ciudadData.data().comodidades,
          descripcion: ciudadData.data().descripcion,
          max: ciudadData.data().max,
          imagen: ciudadData.data().imagen,
          vista: ciudadData.data().vista,
          deshabilitar: ciudadData.data().deshabilitar
        });
      })
    });

  }
    public newHabitacion(form, documentId = this.documentId) {
        let data = {
          nombre: form.nombre,
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

      this.tipoHabitaciones.push(data);
    }

    public editHabitacion(documentId) {
      let editSubscribe = this.tipoHabitacionSV.getHabitacion(documentId).subscribe((habitacion) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newHabitacionForm.setValue({
          id: documentId,
          nombre: habitacion.payload.data()['nombre'],
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

  soltar() {
    this.highlight(-1)
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
