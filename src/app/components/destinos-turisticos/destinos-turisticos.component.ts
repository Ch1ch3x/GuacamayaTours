import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: "app-destinos-turisticos",
  templateUrl: "./destinos-turisticos.component.html",
  styleUrls: ["./destinos-turisticos.component.scss"]
})
export class DestinosTuristicosComponent implements OnInit {
  private estados: any[] = [];
  private ciudades: any[] = [];
  private filteredCiudades: any[] = [];
  private categorias: any[] = [];
  private filteredCategorias: any[] = [];
  private destinos: any[] = [];
  estado: string;
  ciudad: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.fireStoreService.getAll("estados").subscribe(estados => {
      estados.docs.map(estado => {
        this.estados.push({ ...estado.data(), id: estado.id });
      });
    });

    this.fireStoreService.getAll("ciudades").subscribe(ciudades => {
      ciudades.docs.map(ciudad => {
        this.ciudades.push({ ...ciudad.data(), id: ciudad.id });
      });
      this.filteredCiudades = this.ciudades;
    });

    this.fireStoreService.getAll("destinos").subscribe(destinos => {
      this.destinos = destinos.docs.map(destino => ({
        ...destino.data(),
        id: destino.id
      }));
    });

    this.fireStoreService.getAll("categorias").subscribe(categorias => {
      categorias.docs.map(categoria => {
        this.categorias.push({ ...categoria.data(), id: categoria.id });
      });
    });
  }

  onChangeEstado(event) {
    this.estado = event;
    this.filteredCategorias = [];
    this.filteredCiudades = this.ciudades.filter(
      ciudad => ciudad.idEstado === this.estado
    );

    this.destinos
      .filter(destino => {
        if (this.ciudad) {
          return (
            destino.idCiudad === this.ciudad && destino.idEstado === this.estado
          );
        } else return destino.idEstado === this.estado;
      })
      .map(filteredDestino => {
        this.filteredCategorias = this.filteredCategorias.concat(
          filteredDestino.categorias
        );
      });
    this.filteredCategorias = this.categorias.filter(categoria =>
      this.filteredCategorias.some(fc => fc === categoria.id)
    );
  }

  onChangeCiudad(event) {
    this.ciudad = event;
    this.filteredCategorias = [];
    this.destinos
      .filter(destino => {
        if (this.estado) {
          return (
            destino.idCiudad === this.ciudad && destino.idEstado === this.estado
          );
        } else return destino.idCiudad === this.ciudad;
      })
      .map(filteredDestino => {
        this.filteredCategorias = this.filteredCategorias.concat(
          filteredDestino.categorias
        );
      });

    this.filteredCategorias = this.categorias.filter(categoria =>
      this.filteredCategorias.some(fc => fc === categoria.id)
    );
  }
}
