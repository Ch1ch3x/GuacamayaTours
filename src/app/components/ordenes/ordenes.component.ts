import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { IPayPalConfig, ICreateOrderRequest } from "ngx-paypal";
import { FirestoreService } from "../../services/firebase/firebase.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-ordenes",
  templateUrl: "./ordenes.component.html",
  styleUrls: ["./ordenes.component.scss"]
})
export class OrdenesComponent implements OnInit {
  public total: number = 0;
  private reservas: any[] = sessionStorage.getItem("reservas")
    ? JSON.parse(sessionStorage.getItem("reservas"))
    : [];
  public payPalConfig?: IPayPalConfig;

  public compraForm = new FormGroup({
    nombre: new FormControl("", Validators.required),
    cedula: new FormControl("", Validators.required),
    correo: new FormControl("", Validators.required),
    telefono: new FormControl("", Validators.required),
    direccion: new FormControl("", Validators.required)
  });
  constructor(
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}

  ngOnInit() {
    console.log(this.reservas);
    this.reservas.map(reserva => {
      this.total += reserva.costo;
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
                value: `${this.total}`,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: `${this.total}`
                  }
                }
              },
              items: this.reservas.map(reserva => ({
                name: `${reserva.hotel.nombre}, ${reserva.tipoHabitacion.nombre}`,
                quantity: "1",
                category: "DIGITAL_GOODS",
                unit_amount: {
                  currency_code: "USD",
                  value: `${reserva.costo}`
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

        this.fireStoreService.create("reservas", {
          nombreCliente: this.compraForm.value.nombre,
          cedula: this.compraForm.value.cedula,
          itinerario: this.reservas.map(reserva => ({
            hotelId: reserva.hotel.id,
            fechaLlegada: reserva.fechaLlegada,
            fechaSalida: reserva.fechaSalida,
            tipoHabitacion: reserva.tipoHabitacion.id,
            costo: reserva.costo,
            integrantes: Number.parseInt(reserva.integrantes)
          })),
          correo: this.compraForm.value.correo,
          telefono: this.compraForm.value.telefono,
          direccion: this.compraForm.value.direccion,
          estatus: true,
          localizador: data.id
        });
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: err => {
        console.log("OnError", err);
      }
    };
  }
}
