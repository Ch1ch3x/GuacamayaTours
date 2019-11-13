import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: 'app-planear-viaje',
  templateUrl: './planear-viaje.component.html',
  styleUrls: ['./planear-viaje.component.scss']
})
export class PlanearViajeComponent implements OnInit {
  private reservas: any[] = [];
  private destinos: any[] = [];
  private hoteles: any[] = [];
  minDate= new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.fireStoreService.getAll("reservas").subscribe(reservas => {
      reservas.docs.map(reserva => {
        this.reservas.push(reserva.data());
      });
    });
    this.fireStoreService.getAll("destinos").subscribe(destinos => {
      destinos.docs.map(destino => {
        this.destinos.push(destino.data());
      });
    });
    this.fireStoreService.getAll("hoteles").subscribe(hoteles => {
      hoteles.docs.map(hotel => {
        this.hoteles.push(hotel.data());
      });
    });
  }

}
