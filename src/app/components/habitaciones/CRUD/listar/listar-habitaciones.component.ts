import { Component, OnInit } from "@angular/core";
import { MatTable, MatChipInputEvent } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TipoHabitacionService } from "src/app/services/firebase/tipo-habitacion.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-listar-habitaciones",
  templateUrl: "./listar-habitaciones.component.html",
  styleUrls: ["./listar-habitaciones.component.scss"]
})
export class ListarHabitacionesComponent implements OnInit {
  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;

  selectedRowIndex: any;

  public imagenes = [];
  public comodidades = [];
  public tipoHabitacion: any;
  public tipoHabitaciones = [];
  public documentId = null;
  public currentStatus = 1;
  public newHabitacionForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    descripcion: new FormControl("", Validators.required),
    imagen: new FormControl("", Validators.required),
    max: new FormControl("", Validators.required),
    vista: new FormControl("", Validators.required),
    comodidades: new FormControl("", Validators.required),
    deshabilitar: new FormControl(true)
  });

  constructor(
    private tipoHabitacionSV: TipoHabitacionService,
    private titleService: Title
  ) {
    this.newHabitacionForm.setValue({
      nombre: "",
      descripcion: "",
      imagen: "",
      max: "",
      vista: "",
      comodidades: "",
      deshabilitar: true
    });
    this.titleService.setTitle("Admin: Tipos de Habitaciones");
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.tipoHabitacionSV.getAll().subscribe(tipoHabitacionSnapshot => {
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
      });
    });
  }
  public newHabitacion(form, documentId = this.documentId) {
      if (this.currentStatus == 1) {
        let data = {
          nombre: form.nombre,
          max: Number.parseInt(form.max),
          comodidades: this.comodidades,
          descripcion: form.descripcion,
          vista: form.vista,
          imagen: this.imagenes,
          deshabilitar: false
        };
        this.tipoHabitacionSV.create(data).then(
          () => {
            console.log("Documento creado exitósamente!");
            this.newHabitacionForm.setValue({
              nombre: "",
              max: "",
              imagen: "",
              comodidades: "",
              descripcion: "",
              vista: "",
              deshabilitar: false
            });

            this.getData();
          },
          error => {
            console.error(error);
          }
        );

        this.tipoHabitaciones.push(data);
      }
    }

  public editHabitacion(form, documentId = this.documentId) {
    if(this.currentStatus == 2){
      let data = {
        nombre: form.nombre,
        max: Number.parseInt(form.max),
        comodidades: this.comodidades,
        descripcion: form.descripcion,
        vista: form.vista,
        imagen: this.imagenes,
        deshabilitar: false
      };
      this.tipoHabitacionSV.update(documentId, data).then(
        () => {
          console.log("Documento creado exitósamente!");
          this.newHabitacionForm.setValue({
            nombre: "",
            max: "",
            imagen: "",
            comodidades: "",
            descripcion: "",
            vista: "",
            deshabilitar: false
          });

          this.getData();
        },
        error => {
          console.error(error);
        }
      );
    }
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
  editarHabitacion() {
    this.formVisibility = false;
    this.modificarformVisibility = false;
  }

  openModificar() {
    this.currentStatus = 2;
    this.formVisibility = true;
    this.modificarformVisibility = true;
    console.log(this.tipoHabitacion);
    this.newHabitacionForm.setValue({
      nombre: this.tipoHabitacion.nombre,
      descripcion: this.tipoHabitacion.descripcion,
      imagen: "",
      max: this.tipoHabitacion.max,
      vista: this.tipoHabitacion.vista,
      comodidades: "",
      deshabilitar: false
    });
    this.imagenes = this.tipoHabitacion.imagen;
    this.comodidades = this.tipoHabitacion.comodidades;
  }

  modificarCiudad() {
    this.formVisibility = false;
    this.modificarformVisibility = false;
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
    this.tipoHabitacion = dato;
    this.documentId = dato.id;
  }

  soltar() {
    this.highlight(-1);
  }

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.tipoHabitaciones.length; index++) {
      if (this.tipoHabitaciones[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.tipoHabitaciones[index].deshabilitar = true;
      } else {
        continue;
      }
    }
    this.deshabilitarHabitacion(this.selectedRowIndex);
  }

  public deshabilitarHabitacion(documentId) {
    let data = {
      deshabilitar: true
    };
    this.tipoHabitacionSV.actualizar(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newHabitacionForm.setValue({
          nombre: "",
          imagen: "",
          comodidades: "",
          descripcion: "",
          max: "",
          deshabilitar: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  habilitar() {
    for (let index = 0; index < this.tipoHabitaciones.length; index++) {
      console.log(this.tipoHabitaciones[index].nombre);
      if (this.tipoHabitaciones[index].id == this.selectedRowIndex) {
        this.tipoHabitaciones[index].deshabilitar = false;
      } else {
        continue;
      }
    }

    this.habilitarHabitacion(this.selectedRowIndex);
  }

  public habilitarHabitacion(documentId) {
    let data = {
      deshabilitar: false
    };
    this.tipoHabitacionSV.actualizar(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newHabitacionForm.setValue({
          nombre: "",
          imagen: "",
          comodidades: "",
          descripcion: "",
          max: "",
          deshabilitar: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  addImagenes(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our chip
    if ((value || "").trim()) {
      this.imagenes.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeImagenes(imagen): void {
    const index = this.imagenes.indexOf(imagen);

    if (index >= 0) {
      this.imagenes.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our chip
    if ((value || "").trim()) {
      this.comodidades.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(comodidad): void {
    const index = this.comodidades.indexOf(comodidad);

    if (index >= 0) {
      this.comodidades.splice(index, 1);
    }
  }
}
