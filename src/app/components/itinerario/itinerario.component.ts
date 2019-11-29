import { Component, OnInit } from "@angular/core";
import { FirestoreService } from "../../services/firebase/firebase.service";

@Component({
  selector: "app-itinerario",
  templateUrl: "./itinerario.component.html",
  styleUrls: ["./itinerario.component.scss"]
})
export class ItinerarioComponent implements OnInit {
  public localizador: string;
  public reserva: any;
  constructor(private fireService: FirestoreService) {}

  ngOnInit() {}

  buscar() {
    this.fireService.getAll("reservas").subscribe(reservas => {
      this.reserva = reservas.docs.filter(
        r => r.data().localizador === this.localizador
      )[0];
      if (this.reserva) this.reserva = this.reserva.data();
      else alert("No existe ninguna reserva asociada a este localizador");
    });
  }
}
