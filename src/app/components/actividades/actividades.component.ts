import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActividadesService } from 'src/app/services/firebase/actividades.service';

@Component({
  selector: "app-actividades",
  templateUrl: "./actividades.component.html",
  styleUrls: ["./actividades.component.scss"]
})
export class ActividadesComponent implements OnInit {
  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
  selectedRowIndex: any;

  public actividades = [];
  public nombreActividad: any;
  public imagenActividad: any;
  public documentId = null;
  public currentStatus = 1;
  public newActividadForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    imagen: new FormControl("", Validators.required),
    deshabilitar: new FormControl(false)
  });

  constructor(
    private ActividadesSV: ActividadesService,
    private titleService: Title
  ) {
    this.newActividadForm.setValue({
      nombre: "",
      imagen: "",
      deshabilitar: false
    });
  }
  ngOnInit() {
    this.obtenerActividades();
    this.titleService.setTitle("Admin: Actividades");
  }

  obtenerActividades() {
    this.ActividadesSV.getAll().subscribe(actividadesSnapshot => {
      this.actividades = [];
      actividadesSnapshot.docs.forEach(actividadData => {
        this.actividades.push({
          id: actividadData.id,
          nombre: actividadData.data().nombre,
          imagen: actividadData.data().imagen,
          deshabilitar: actividadData.data().deshabilitar
        });
      });
    });
  }

  public newActividad(form) {
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        imagen: form.imagen,
        deshabilitar: false
      };
      this.ActividadesSV.create(data).then(
        () => {
          console.log("Documento creado exitósamente!");
          this.newActividadForm.setValue({
            nombre: "",
            imagen: "",
            deshabilitar: false
          });
          this.obtenerActividades();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  public editActividad(form, documentId = this.selectedRowIndex) {
    if (this.currentStatus == 2) {
      let data = {
        nombre: form.nombre,
        imagen: form.imagen,
        deshabilitar: this.actividades.filter(
          actividad => actividad.id == this.selectedRowIndex
        )[0].deshabilitar
      };
      this.ActividadesSV.update(documentId, data).then(
        () => {
          console.log("Documento modificado exitósamente!");
          this.newActividadForm.setValue({
            nombre: "",
            imagen: "",
            deshabilitar: false
          });
          this.obtenerActividades();
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

  crearActividad() {
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
    this.nombreActividad = dato.nombre;
    this.imagenActividad = dato.imagen;
  }

  openModificar() {
    this.currentStatus = 2;
    this.formVisibility = true;
    this.modificarformVisibility = true;
  }

  modificarActividad() {
    this.formVisibility = false;
    this.modificarformVisibility = false;
  }

  soltar() {
    this.highlight(-1);
  }

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.actividades.length; index++) {
      if (this.actividades[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.actividades[index].deshabilitar = true;
      } else {
        continue;
      }
    }
    this.deshabilitarActividades(this.selectedRowIndex);
  }

  public deshabilitarActividades(documentId) {
    let data = {
      deshabilitar: true
    };
    this.ActividadesSV.actualizar(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newActividadForm.setValue({
          nombre: "",
          imagen: "",
          deshabilitar: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  habilitar() {
    for (let index = 0; index < this.actividades.length; index++) {
      console.log(this.actividades[index].nombre);
      if (this.actividades[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.actividades[index].deshabilitar = false;
      } else {
        continue;
      }
    }
    this.habilitarActividades(this.selectedRowIndex);
  }

  public habilitarActividades(documentId) {
    let data = {
      deshabilitar: false
    };
    this.ActividadesSV.actualizar(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newActividadForm.setValue({
          nombre: "",
          imagen: "",
          deshabilitar: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }
}
