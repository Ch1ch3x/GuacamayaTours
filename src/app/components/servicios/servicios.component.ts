import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ServiciosService } from 'src/app/services/firebase/servicios.service';
@Component({
  selector: "app-servicios",
  templateUrl: "./servicios.component.html",
  styleUrls: ["./servicios.component.scss"]
})
export class ServiciosComponent implements OnInit {
  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
  selectedRowIndex: any;

  public servicios = [];
  public nombreServicio: any;
  public documentId = null;
  public currentStatus = 1;
  public newServicioForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    deshabilitar: new FormControl(true)
  });

  constructor(
    private ServicioSV: ServiciosService,
    private titleService: Title
  ) {
    this.newServicioForm.setValue({
      nombre: "",
      deshabilitar: true
    });
  }

  ngOnInit() {
    this.obtenerServicios();
    this.titleService.setTitle("Admin: Categorias de Destinos");
  }

  obtenerServicios() {
    this.ServicioSV.getAll().subscribe(categoriasSnapshot => {
      this.servicios = [];
      categoriasSnapshot.docs.forEach(categoriaData => {
        this.servicios.push({
          id: categoriaData.id,
          nombre: categoriaData.data().nombre,
          deshabilitar: categoriaData.data().deshabilitar
        });
      });
    });
  }

  public newServicio(form) {
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        deshabilitar: false
      };
      this.ServicioSV.create(data).then(
        () => {
          console.log("Documento creado exitósamente!");
          this.newServicioForm.setValue({
            nombre: "",
            deshabilitar: false
          });
          this.obtenerServicios();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  public editServicio(form, documentId = this.selectedRowIndex) {
    if (this.currentStatus == 2) {
      let data = {
        nombre: form.nombre,
        deshabilitar: this.servicios.filter(
          servicio => servicio.id == this.selectedRowIndex
        )[0].deshabilitar
      };
      this.ServicioSV.update(documentId, data).then(
        () => {
          console.log("Documento modificado exitósamente!");
          this.newServicioForm.setValue({
            nombre: "",
            deshabilitar: false
          });
          this.obtenerServicios();
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

  crearServicio() {
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
    this.nombreServicio = dato.nombre;
  }

  openModificar() {
    this.currentStatus = 2;
    this.formVisibility = true;
    this.modificarformVisibility = true;
  }

  modificarServicio() {
    this.formVisibility = false;
    this.modificarformVisibility = false;
  }

  soltar() {
    this.highlight(-1);
  }

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.servicios.length; index++) {
      if (this.servicios[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.servicios[index].deshabilitar = true;
      } else {
        continue;
      }
    }
    this.deshabilitarServicio(this.selectedRowIndex);
  }

  public deshabilitarServicio(documentId) {
    let data = {
      nombre: this.servicios[this.numerito].nombre,
      deshabilitar: true
    };
    this.ServicioSV.update(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newServicioForm.setValue({
          nombre: "",
          deshabilitar: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  habilitar() {
    for (let index = 0; index < this.servicios.length; index++) {
      console.log(this.servicios[index].nombre);
      if (this.servicios[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.servicios[index].deshabilitar = false;
      } else {
        continue;
      }
    }
    this.habilitarServicio(this.selectedRowIndex);
  }

  public habilitarServicio(documentId) {
    let data = {
      nombre: this.servicios[this.numerito].nombre,
      deshabilitar: false
    };
    this.ServicioSV.update(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newServicioForm.setValue({
          nombre: "",
          deshabilitar: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }
}
