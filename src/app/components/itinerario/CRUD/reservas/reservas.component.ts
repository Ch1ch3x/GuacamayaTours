import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReservasService } from 'src/app/services/firebase/reservas.service';

@Component({
  selector: "app-reservas",
  templateUrl: "./reservas.component.html",
  styleUrls: ["./reservas.component.scss"]
})
export class ReservasComponent implements OnInit {
  selectedRowIndex: any;
  public reservas = [];
  public documentId = null;

  constructor(
    private ReservasSV: ReservasService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.obtenerReservas();
    this.titleService.setTitle("Admin: Reservas");
  }

  obtenerReservas() {
    this.ReservasSV.getAll().subscribe(reservasSnapshot => {
      this.reservas = [];
      reservasSnapshot.docs.forEach(reservasData => {
        this.reservas.push({
          id: reservasData.id,
          nombre: reservasData.data().nombreCliente,
          cedula: reservasData.data().cedula,
          correo: reservasData.data().correo,
          direccion: reservasData.data().direccion,
          localizador: reservasData.data().localizador,
          telefono: reservasData.data().telefono,
          deshabilitar: reservasData.data().estatus
        });
      });
    });
  }

  soltar() {
    this.highlight(-1);
  }

  highlight(dato) {
    this.selectedRowIndex = dato.id;
  }

  public numerito;

  deshabilitar() {
    for (let index = 0; index < this.reservas.length; index++) {
      if (this.reservas[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.reservas[index].deshabilitar = false;
      } else {
        continue;
      }
    }
    this.deshabilitarReserva(this.selectedRowIndex);
  }

  public deshabilitarReserva(documentId) {
    let data = {
      estatus: false
    };
    this.ReservasSV.actualizar(documentId, data);
  }

  habilitar() {
    for (let index = 0; index < this.reservas.length; index++) {
      console.log(this.reservas[index].nombre);
      if (this.reservas[index].id == this.selectedRowIndex) {
        this.numerito = index;
        this.reservas[index].deshabilitar = true;
      } else {
        continue;
      }
    }
    this.habilitarReserva(this.selectedRowIndex);
  }

  public habilitarReserva(documentId) {
    let data = {
      estatus: true
    };
    this.ReservasSV.actualizar(documentId, data);
  }
}
