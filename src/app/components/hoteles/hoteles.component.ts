import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: "app-hoteles",
  templateUrl: "./hoteles.component.html",
  styleUrls: ["./hoteles.component.scss"]
})
export class HotelesComponent implements OnInit {
  private reservas: any[] = [];
  private destinoFilter: string;
  private personasFilter: string;
  private destinos: any[] = [];
  private llegadaFilter: Date;
  private precioFilter: string = "0";
  private salidaFilter: Date;
  private filteredHoteles: any[] = [];
  private hoteles: any[] = [];
  private tipoHabitaciones: any[] = [];
  minDate = new Date();
  private hotel: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.fireStoreService.getAll("reservas").subscribe(reservas => {
      reservas.docs.map(reserva => {
        this.reservas.push(reserva.data());
      });
    });
    this.fireStoreService.getAll("destinos").subscribe(destinos => {
      destinos.docs.map(destino => {
        this.destinos.push({ ...destino.data(), id: destino.id });
      });
    });
    this.fireStoreService.getAll("hoteles").subscribe(hoteles => {
      hoteles.docs.map(hotel => {
        this.hoteles.push({ ...hotel.data(), id: hotel.id });
      });
      this.filteredHoteles = this.hoteles;
    });

    this.fireStoreService.getAll("tipoHabitacion").subscribe(tipoHabts => {
      tipoHabts.docs.map(tipoHabt => {
        this.tipoHabitaciones.push({ ...tipoHabt.data(), id: tipoHabt.id });
      });
    });
  }

  onChangeDestinos(destino) {
    this.destinoFilter = destino;
    this.filtrar();
  }

  onChangePersonas(personas) {
    this.personasFilter = personas;
    this.filtrar();
  }

  onChangeLlegada(llegada) {
    this.llegadaFilter = llegada;
    this.filtrar();
  }

  onChangeSalida(salida) {
    this.salidaFilter = salida;
    this.filtrar();
  }

  onChangePrice(precio) {
    this.precioFilter = precio;
    this.filtrar();
  }
  filtrar() {
    this.filteredHoteles = this.hoteles;

    if (this.destinoFilter) {
      const idCiudad = this.destinos.filter(
        destino => destino.id === this.destinoFilter
      )[0].idCiudad;
      this.filteredHoteles = this.filteredHoteles.filter(
        fH => fH.idCiudad === idCiudad
      );
    }

    if (this.personasFilter) {
      this.filteredHoteles = this.filteredHoteles.filter(fH => {
        return fH.tipoHabitaciones.some(
          tipoH =>
            this.tipoHabitaciones.filter(
              tipoHabitacion => tipoHabitacion.id === tipoH.tipoHabitacion
            )[0].max >= this.personasFilter
        );
      });
    }

    if (this.llegadaFilter) {
      this.filteredHoteles = this.filteredHoteles.filter(filteredHotel =>
        filteredHotel.tipoHabitaciones.some(tipoH => {
          return tipoH.fechaInicio.toDate() <= this.llegadaFilter;
        })
      );
    }

    if (this.salidaFilter) {
      this.filteredHoteles = this.filteredHoteles.filter(filteredHotel =>
        filteredHotel.tipoHabitaciones.some(
          tipoH => tipoH.fechaFin.toDate() >= this.salidaFilter
        )
      );
    }

    if (this.precioFilter) {
      switch (this.precioFilter) {
        case "1":
          this.filteredHoteles = this.filteredHoteles.sort(
            (fh1, fh2) => fh2.fullday.costo - fh1.fullday.costo
          );

          break;
        case "2":
          this.filteredHoteles = this.filteredHoteles.sort(
            (fh1, fh2) => fh1.fullday.costo - fh2.fullday.costo
          );
          break;
        default:
          this.filteredHoteles = this.filteredHoteles.sort(
            (fh1, fh2) => fh1.fullday.costo - fh2.fullday.costo
          );
          break;
      }
    }
  }
}
