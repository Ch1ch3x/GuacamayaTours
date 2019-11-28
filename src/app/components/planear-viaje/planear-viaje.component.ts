import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { IPayPalConfig, ICreateOrderRequest } from "ngx-paypal";
import { FirestoreService } from "src/app/services/firebase/firebase.service";
import { DialogComponent } from "./dialog/dialog.component";

@Component({
  selector: "app-planear-viaje",
  templateUrl: "./planear-viaje.component.html",
  styleUrls: ["./planear-viaje.component.scss"]
})
export class PlanearViajeComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  private reservas: any[] = [];
  private destinos: any[] = [];
  private hoteles: any[] = [];
  private filteredHoteles: any[] = [];
  private estado: any;
  private destinoFilter: any;
  private ciudad: any;
  private personasFilter: any;
  private estados: any[] = [];
  private precioFilter: string = "0";
  private ciudades: any[] = [];
  private filteredCiudades: any[] = [];
  private tipoHabitaciones: any[] = [];
  private dialogTipoHabitaciones: any[] = [];
  private llegadaFilter: Date;
  private salidaFilter: Date;
  minDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initConfig([]);
    this.fireStoreService.getAll("destinos").subscribe(destinos => {
      destinos.docs.map(destino => {
        this.destinos.push({ ...destino.data(), id: destino.id });
      });
    });
    this.fireStoreService.getAll("hoteles").subscribe(hoteles => {
      hoteles.docs.map(hotel => {
        this.hoteles.push(hotel.data());
      });
      this.filteredHoteles = this.hoteles;
    });
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
    this.fireStoreService.getAll("tipoHabitacion").subscribe(tipoHabts => {
      tipoHabts.docs.map(tipoHabt => {
        this.tipoHabitaciones.push({ ...tipoHabt.data(), id: tipoHabt.id });
      });
    });
  }

  private initConfig(reservas: any[]): void {
    let total = 0;

    reservas.map(reserva => {
      total += reserva.hotel.fullday.costo;
    });
    this.payPalConfig = {
      currency: "USD",
      clientId: "sb",
      createOrderOnClient: data =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: `${total}`,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: `${total}`
                  }
                }
              },
              items: reservas.map(reserva => ({
                name: `${reserva.hotel.nombre}, ${reserva.tipoHabitacion.nombre}`,
                quantity: "1",
                category: "DIGITAL_GOODS",
                unit_amount: {
                  currency_code: "USD",
                  value: `${reserva.hotel.fullday.costo}`
                }
              }))
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then(details => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: data => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );

        this.fireStoreService.create("reservas", data);
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: err => {
        console.log("OnError", err);
      }
    };
  }

  openDialog(hotel) {
    this.dialogTipoHabitaciones = hotel.tipoHabitaciones;
    this.dialogTipoHabitaciones = this.tipoHabitaciones.filter(th =>
      this.dialogTipoHabitaciones.some(tipoH => tipoH.tipoHabitacion === th.id)
    );
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.dialogTipoHabitaciones
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reservas.push({
          hotel,
          tipoHabitacion: this.dialogTipoHabitaciones.filter(
            tH => tH.id === result
          )[0]
        });
        this.initConfig(this.reservas);
      }
    });
  }

  onChangePrice(precio) {
    this.precioFilter = precio;
    this.filtrar();
  }
  onChangeEstado(event) {
    this.estado = event;
    this.filteredCiudades = this.ciudades.filter(
      ciudad => ciudad.idEstado === this.estado
    );
    this.ciudad = null;
  }

  onChangeCiudad(event) {
    this.ciudad = event;
  }

  onChangeDestinos(destino) {
    debugger;
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
  filtrar() {
    if (this.ciudad) {
      if (this.estado) {
        this.filteredHoteles = this.hoteles.filter(
          hotel =>
            hotel.idCiudad === this.ciudad && hotel.idEstado === this.estado
        );
      } else {
        this.filteredHoteles = this.hoteles.filter(
          hotel => hotel.idCiudad === this.ciudad
        );
      }
    } else if (this.estado) {
      this.filteredHoteles = this.hoteles.filter(
        hotel => hotel.idEstado === this.estado
      );
    }

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
