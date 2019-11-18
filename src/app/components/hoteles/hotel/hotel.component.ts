import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: "app-hotel",
  templateUrl: "./hotel.component.html",
  styleUrls: ["./hotel.component.scss"]
})
export class HotelComponent implements OnInit {
  private habitaciones: any[] = [];
  private hotel: any;
  private hotelId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.hotelId = this.route.snapshot.params["id"];

    this.fireStoreService.getDoc("hoteles", this.hotelId).subscribe(hotel => {
      this.fireStoreService
        .getAll("tipoHabitacion")
        .subscribe(tipoHabitaciones => {
          this.hotel = { ...hotel.payload.data(), id: hotel.payload.id };
          this.fireStoreService
            .getDoc("ciudades", this.hotel.idCiudad)
            .subscribe((ciudad: any) => {
              this.hotel.ciudad = ciudad.payload.data().nombre;
              this.habitaciones = tipoHabitaciones.docs
                .map(doc => ({ ...doc.data(), id: doc.id }))
                .filter(tipoHabitacion =>
                  this.hotel.tipoHabitaciones.some(
                    tH => tH.tipoHabitacion == tipoHabitacion.id
                  )
                );
            });
        });
    });
  }
}