import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.scss']
})
export class DestinoComponent implements OnInit {
  private destinos: any[] = [];
  private categorias: any[] = [];
  private destino: any;
  private Destino: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.destino = this.route.snapshot.params["id"];
    console.log(this.destino);

    this.fireStoreService.getAll("destinos").subscribe(destinos => {
      this.destinos = destinos.docs.map(destino => ({
        ...destino.data(),
        id: destino.id
      }));
    });

    this.Destino = this.destinos.find(destino => destino.id === this.destino);
    console.log(this.Destino);



    this.fireStoreService.getAll("categorias").subscribe(categorias => {
      categorias.docs.map(categoria => {
        this.categorias.push(categoria.data());
      });
    });
  }

}
