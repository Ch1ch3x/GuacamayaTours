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
  private categorias: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.fireStoreService.getAll("estados").subscribe(estados => {
      estados.docs.map(estado => {
        this.estados.push(estado.data());
      });
    });

    this.fireStoreService.getAll("ciudades").subscribe(ciudades => {
      ciudades.docs.map(ciudad => {
        this.ciudades.push(ciudad.data());
      });
    });

    this.fireStoreService.getAll("categorias").subscribe(categorias => {
      categorias.docs.map(categoria => {
        this.categorias.push(categoria.data());
      });
    });
  }
}
