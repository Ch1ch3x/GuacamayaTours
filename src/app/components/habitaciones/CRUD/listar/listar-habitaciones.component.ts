import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoHabitacionService } from 'src/app/services/firebase/tipo-habitacion.service';

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
    'fechas disponibles',
    'disponibilidad',
    'imagen',
  ];
 // dataSource = ELEMENT_DATA;


 // @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  selectedRowIndex: number = -1;

  public tipoHabitaciones = [];
  public documentId = null;
  public currentStatus = 1;
  public newHabitacionForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    hotel: new FormControl('', Validators.required),
    fechasDisponibles: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    imagen2: new FormControl(''),
    imagen3: new FormControl(''),
    deshabilitar: new FormControl(true),

  });

  constructor(private tipoHabitacionSV: TipoHabitacionService) {
    this.newHabitacionForm.setValue({
      nombre: '',
      hotel: '',
      fechasDisponibles: '',
      imagen: '',
      imagen2: '',
      imagen3: '',
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
          hotel: ciudadData.payload.doc.data().hotel,
          fechasDisponibles: ciudadData.payload.doc.data().fechasDisponibles,
          imagen: ciudadData.payload.doc.data().imagen,
          imagen2: ciudadData.payload.doc.data().imagen2,
          imagen3: ciudadData.payload.doc.data().imagen3,
          deshabilitar: ciudadData.payload.doc.data().deshabilitar
        });
      })
    });
  }
    public newHabitacion(form, documentId = this.documentId) {
      console.log(`Status: ${this.currentStatus}`);
      if (this.currentStatus == 1) {
        let data = {
          nombre: form.nombre,
          hotel: form.hotel,
          fechasDisponibles: form.fechasDisponibles,
          imagen: form.imagen,
          imagen2: form.imagen2,
          imagen3: form.imagen3,
          deshabilitar: form.deshabilitar
        }
        this.tipoHabitacionSV.create(data).then(() => {
          console.log('Documento creado exitósamente!');
          this.newHabitacionForm.setValue({
            nombre: '',
            hotel: '',
            fechasDisponibles: '',
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

    public editHabitacion(documentId) {
      let editSubscribe = this.tipoHabitacionSV.getHabitacion(documentId).subscribe((habitacion) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newHabitacionForm.setValue({
          id: documentId,
          nombre: habitacion.payload.data()['nombre'],
          hotel: habitacion.payload.data()['hotel'],
          imagen: habitacion.payload.data()['imagen'],
          imagen2: habitacion.payload.data()['imagen2'],
          imagen3: habitacion.payload.data()['imagen3'],
          desabilitar: habitacion.payload.data()['desabilitar'],
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
  }
  habilitar() {
  }

}
