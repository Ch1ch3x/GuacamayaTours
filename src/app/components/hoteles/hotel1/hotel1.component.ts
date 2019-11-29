import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: 'app-hotel1',
  templateUrl: './hotel1.component.html',
  styleUrls: ['./hotel1.component.scss']
})
export class Hotel1Component implements OnInit {
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
              this.fireStoreService
                .getDoc("estados", this.hotel.idEstado)
                .subscribe((estado: any) => {
                  this.hotel.estado = estado.payload.data().nombre;  
                  console.log(this.hotel);      
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
    });
    

  }
}
