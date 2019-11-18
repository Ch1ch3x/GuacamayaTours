import { tipo } from '../../../../interfaces/tipo';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/services/firebase/categorias.service';



@Component({
  selector: 'app-lista-categoria-destino',
  templateUrl: './lista-categoria-destino.component.html',
  styleUrls: ['./lista-categoria-destino.component.scss']
})
export class ListaCategoriaDestinoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'id'];

  @ViewChild(MatTable,  { static: true}) table: MatTable<any>;

  formVisibility = false;
  modificarformVisibility = false;
  crearformVisibility = false;
  selectedRowIndex: any;


  public categorias = [];
  public categoria: any;
  public documentId = null;
  public currentStatus = 1;
  public newCategoriaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    deshabilitar: new FormControl(true)
  });

  constructor(private CategoriaSV: CategoriasService) {
    this.newCategoriaForm.setValue({
      nombre: '',
      deshabilitar: true
    });
  }

  ngOnInit() {
    this.CategoriaSV.getAll().subscribe((categoriasSnapshot) => {
      this.categorias = [];
      categoriasSnapshot.docs.forEach((categoriaData) => {
        this.categorias.push({
          id: categoriaData.id,
          nombre: categoriaData.data().nombre,
          deshabilitar: categoriaData.data().deshabilitar
        });
      })
    });
  }
    public newCategoria(form, documentId = this.documentId) {
        let data = {
          nombre: form.nombre,
          deshabilitar: true
        }
        this.CategoriaSV.create(data).then(() => {
          console.log('Documento creado exitósamente!');
          this.newCategoriaForm.setValue({
            nombre: '',
            deshabilitar: true
          });
        }, (error) => {
          console.error(error);
        });
        this.categorias.push(data);
    }

    public editCategoria(form, documentId) {
      let data = {
        nombre: form.nombre,
        deshabilitar: true
      }
      this.CategoriaSV.update(documentId, data).then(() => {
        console.log('Documento modificado exitósamente!');
        this.newCategoriaForm.setValue({
        nombre: '',
        deshabilitar: true
        });
      }, (error) => {
          console.error(error);
      });
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
  }

  openModificar() {
    this.documentId = this.selectedRowIndex;
    this.currentStatus = 2;
    for (let index = 0; index < this.categorias.length; index++) {
      console.log(this.categorias[index].id);
      console.log(this.selectedRowIndex);
      if (this.categorias[index].id == this.documentId) {
        this.categorias[index] = this.categoria;
      } else {
        continue;
      }
    }
    this.newCategoriaForm.setValue({
      nombre: this.categoria.nombre,
      deshabilitar: this.categoria.deshabilitar
    });
    this.formVisibility = true;
    this.modificarformVisibility = true;

  }

  modificarCategoria() {
    this.currentStatus = 2;
    this.formVisibility = false;
    this.crearformVisibility = false;
    this.modificarformVisibility = false;
  }

  soltar() {
    this.highlight(-1);
  }

  deshabilitar() {
    for (let index = 0; index < this.categorias.length; index++) {
      console.log(this.categorias[index].nombre);
      if (this.categorias[index].id == this.selectedRowIndex) {
        this.categorias[index].deshabilitar = false;
      } else {
        continue;
      }
    }
  }

  habilitar() {
    for (let index = 0; index < this.categorias.length; index++) {
      console.log(this.categorias[index].nombre);
      if (this.categorias[index].id == this.selectedRowIndex){
        this.categorias[index].deshabilitar = true;
      } else {
        continue;
      }
    }
  }
}
