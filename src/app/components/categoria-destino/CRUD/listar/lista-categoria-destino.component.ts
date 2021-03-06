import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTable } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoriasService } from "src/app/services/firebase/categorias.service";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-lista-categoria-destino",
  templateUrl: "./lista-categoria-destino.component.html",
  styleUrls: ["./lista-categoria-destino.component.scss"]
})
export class ListaCategoriaDestinoComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
  selectedRowIndex: any;

  public categorias = [];
  public nombreCategoria: any;
  public documentId = null;
  public currentStatus = 1;
  public newCategoriaForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    deshabilitar: new FormControl(true)
  });

  constructor(private CategoriaSV: CategoriasService, private titleService: Title) {
    this.newCategoriaForm.setValue({
      nombre: "",
      deshabilitar: true
    });
  }

  ngOnInit() {
    this.obtenerCategorias();
    this.titleService.setTitle('Admin: Categorias de Destinos');
  }

  obtenerCategorias() {
    this.CategoriaSV.getAll().subscribe(categoriasSnapshot => {
      this.categorias = [];
      categoriasSnapshot.docs.forEach(categoriaData => {
        this.categorias.push({
          id: categoriaData.id,
          nombre: categoriaData.data().nombre,
          deshabilitar: categoriaData.data().deshabilitar
        });
      });
    });
  }

  public newCategoria(form) {
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        deshabilitar: false
      };
      this.CategoriaSV.create(data).then(
        () => {
          console.log("Documento creado exitósamente!");
          this.newCategoriaForm.setValue({
            nombre: "",
            deshabilitar: false
          });
          this.obtenerCategorias();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  public editCategoria(form, documentId = this.selectedRowIndex) {
    if (this.currentStatus == 2) {
      let data = {
        nombre: form.nombre,
        deshabilitar: this.categorias.filter(
          categoria => categoria.id == this.selectedRowIndex
        )[0].deshabilitar
      };
      this.CategoriaSV.update(documentId, data).then(
        () => {
          console.log("Documento modificado exitósamente!");
          this.newCategoriaForm.setValue({
            nombre: "",
            deshabilitar: false
          });
          this.obtenerCategorias();
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

  crearCategoria() {
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
    this.nombreCategoria = dato.nombre;
  }

  openModificar() {
    this.currentStatus = 2;
    this.formVisibility = true;
    this.modificarformVisibility = true;
  }

  modificarCategoria() {
    this.formVisibility = false;
    this.modificarformVisibility = false;
  }

  soltar() {
    this.highlight(-1);
  }

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.categorias.length; index++) {
      if (this.categorias[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.categorias[index].deshabilitar = true;
      } else {
        continue;
      }
    }
    this.deshabilitarCategoria(this.selectedRowIndex);
  }

  public deshabilitarCategoria(documentId) {
    let data = {
      deshabilitar: true
    };
    this.CategoriaSV.actualizar(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newCategoriaForm.setValue({
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
    for (let index = 0; index < this.categorias.length; index++) {
      console.log(this.categorias[index].nombre);
      if (this.categorias[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.categorias[index].deshabilitar = false;
      } else {
        continue;
      }
    }
    this.habilitarCategoria(this.selectedRowIndex);
  }

  public habilitarCategoria(documentId) {
    let data = {
      deshabilitar: false
    };
    this.CategoriaSV.actualizar(documentId, data).then(
      () => {
        console.log("Documento modificado exitósamente!");
        this.newCategoriaForm.setValue({
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
