import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  images = [
    "../../../assets/img/margarita.jpg",
    "../../../assets/img/roraima(2).png",
    "../../../assets/img/juangriego.jpg"
  ];

  private destinos: any[] = [];
  private actividades: any[] = [];
  private hoteles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.fireStoreService.getAll("ordenes").subscribe(data => {
      data.docs.map(orden => console.log(orden.data()));
    });

    this.fireStoreService.getAll("destinos").subscribe(destinos => {
      this.destinos = destinos.docs.map(destino => ({
        ...destino.data(),
        id: destino.id
      }));
    });

    this.fireStoreService.getAll("hoteles").subscribe(hoteles => {
      this.hoteles = hoteles.docs.map(hotel => ({
        ...hotel.data(),
        id: hotel.id
      }));
    });

    this.fireStoreService.getAll("actividades").subscribe(actividades => {
      this.actividades = actividades.docs.map(actividad => ({
        ...actividad.data(),
        id: actividad.id
      }));
    });
  }
}
