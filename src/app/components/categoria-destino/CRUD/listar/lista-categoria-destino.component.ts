import { tipo } from '../../../../interfaces/tipo';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import tipos from '../../../../data/tipos.json';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/services/firebase/categorias.service';


const ELEMENT_DATA: tipo[] = tipos;

@Component({
  selector: 'app-lista-categoria-destino',
  templateUrl: './lista-categoria-destino.component.html',
  styleUrls: ['./lista-categoria-destino.component.scss']
})
export class ListaCategoriaDestinoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'id'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,  { static: true}) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
  selectedRowIndex: any;


  public categorias = [];
  public documentId = null;
  public currentStatus = 1;
  public newCategoriaForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    imagen2: new FormControl('', Validators.required),
    imagen3: new FormControl('', Validators.required),
    deshabilitar: new FormControl('', Validators.required)
  });

  constructor(private CategoriaSV: CategoriasService) {
    this.newCategoriaForm.setValue({
      id: '',
      nombre: '',
      imagen: '',
      imagen2: '',
      imagen3: '',
      deshabilitar: ''
    });
  }

  ngOnInit() {
    this.CategoriaSV.getAll().subscribe((categoriasSnapshot) => {
      this.categorias = [];
      categoriasSnapshot.forEach((categoriaData: any) => {
        this.categorias.push({
          id: categoriaData.payload.doc.data(),
          nombre: categoriaData.payload.doc.data().nombre,
          imagen: categoriaData.payload.doc.data().imagen,
          imagen2: categoriaData.payload.doc.data().imagen2,
          imagen3: categoriaData.payload.doc.data().imagen3,
          deshabilitar: categoriaData.payload.doc.data().deshabilitar
        });
      })
    });
  }
    public newCategoria(form, documentId = this.documentId) {
      console.log(`Status: ${this.currentStatus}`);
      if (this.currentStatus == 1) {
        let data = {
          nombre: form.nombre,
          imagen: form.imagen,
          imagen2: form.imagen2,
          imagen3: form.imagen3,
          deshabilitar: form.deshabilitar
        }
        this.CategoriaSV.create(data).then(() => {
          console.log('Documento creado exitósamente!');
          this.newCategoriaForm.setValue({
            nombre: '',
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
          imagen: form.imagen,
          imagen2: form.imagen2,
          imagen3: form.imagen3,
          deshabilitar: form.deshabilitar
        }
        this.CategoriaSV.update(documentId, data).then(() => {
          this.currentStatus = 1;
          this.newCategoriaForm.setValue({
            nombre: '',
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

    public editCategoria(documentId) {
      let editSubscribe = this.CategoriaSV.getCategoria(documentId).subscribe((categoria) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newCategoriaForm.setValue({
          id: documentId,
          nombre: categoria.payload.data()['nombre'],
          estado: categoria.payload.data()['estado'],
          imagan: categoria.payload.data()['imagen'],
          imagen2: categoria.payload.data()['imagen2'],
          imagen3: categoria.payload.data()['imagen3'],
          deshabilitar: categoria.payload.data()['deshabilitar'],
        });
        editSubscribe.unsubscribe();
      });
    }



  clearEstado() {
  }

  openCrear() {
    this.formVisibility = true;
    this.crearformVisibility = true;
  }

  crearCategoria() {
    this.formVisibility = false;
    this.crearformVisibility = false;
  }

  addRowData() {
    this.clearEstado();
    this.table.renderRows();
  }

  modifyRowData() {
    this.table.renderRows();
  }

  openModificar() {
    this.formVisibility = true;
    this.modificarformVisibility = true;
  }

  close() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  modificar() {
  }

  modificarCategoria() {
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  highlight(dato) {
    this.selectedRowIndex = dato.id;
  }
  deshabilitar() {
    for (let index = 0; index < tipos.length; index++) {
      console.log("1")
      console.log(this.categorias[index].nombre);
      if (this.categorias[index].id == this.selectedRowIndex){
        console.log("2")
        this.categorias[index].deshabilitar = false;
        this.categorias[index].deshabilitar.toString
        console.log("3")
        console.log(this.categorias[index].id.deshabilitar)
        let editSubscribe = this.CategoriaSV.getCategoria(this.categorias[index].id).subscribe((categoria) => {
          this.currentStatus = 2;
          this.newCategoriaForm = this.categorias[index].id;
          this.newCategoriaForm.setValue({
            id: this.categorias[index].id,
            deshabilitar: categoria.payload.data()['deshabilitar'],
          });
          console.log(this.categorias[index].id)
          editSubscribe.unsubscribe();
        });
        console.log(this.categorias[index].id)
        this.table.renderRows;
      } else {
        continue;
      }
    }
  }

  habilitar() {
    for (let index = 0; index < tipos.length; index++) {
      console.log(this.categorias[index].nombre);
      if (this.categorias[index].id == this.selectedRowIndex){
        this.categorias[index].deshabilitar = true;
        this.categorias[index].deshabilitar.toString
        let editSubscribe = this.CategoriaSV.getCategoria(this.categorias[index].id).subscribe((categoria) => {
          this.currentStatus = 2;
          this.documentId = this.categorias[index].id;
          this.newCategoriaForm.setValue({
            id: this.documentId,
            deshabilitar: categoria.payload.data()['deshabilitar'],
          });
          editSubscribe.unsubscribe();
        });
        this.table.renderRows;
      } else {
        continue;
      }
    }
  }
}
