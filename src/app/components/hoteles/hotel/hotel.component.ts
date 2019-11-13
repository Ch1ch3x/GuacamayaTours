import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: "app-hotel",
  templateUrl: "./hotel.component.html",
  styleUrls: ["./hotel.component.scss"]
})
export class HotelComponent implements OnInit {
  private hoteles: any[] = [];
  private tipoHabitaciones: any[] = [];
  private hotel: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.hotel = this.route.snapshot.params["id"];

    this.fireStoreService.getDoc("hoteles", this.hotel).subscribe(hotel => {
      console.log(hotel);
      this.hotel = hotel.payload.data();
      this.hotel.tipoHabitaciones.map(tipo => {
        this.fireStoreService
          .getAll("tipoHabitacion")
          .subscribe(tipoHabitaciones => {
            tipoHabitaciones.docs.map(tipoH => {
              if (tipoH.id === tipo) {
                this.tipoHabitaciones.push(tipoH.data());
              }
            });
          });
      });
    });
  }
}
