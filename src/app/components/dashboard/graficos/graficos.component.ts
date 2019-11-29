import { Component, OnInit } from '@angular/core';
import { DestinosService } from 'src/app/services/firebase/destinos.service';
import { TipoHabitacionService } from 'src/app/services/firebase/tipo-habitacion.service';
import { HotelesService } from 'src/app/services/firebase/hoteles.service';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label, SingleDataSet } from "ng2-charts";
import { ReservasService } from 'src/app/services/firebase/reservas.service';

@Component({
  selector: "app-graficos",
  templateUrl: "./graficos.component.html",
  styleUrls: ["./graficos.component.scss"]
})
export class GraficosComponent implements OnInit {
  public tipoHabitaciones = [];
  public hoteles = [];
  public destinos = [];
  public reservas = [];

  constructor(
    private HotelSV: HotelesService,
    private TipoHabitacionSV: TipoHabitacionService,
    private DestinoSV: DestinosService,
    private ReservaSV: ReservasService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.DestinoSV.getAll().subscribe(destinosSnapshot => {
      this.destinos = [];
      destinosSnapshot.docs.forEach((destinoData: any) => {
        this.destinos.push({
          id: destinoData.id,
          nombre: destinoData.data().nombre,
          descripcion: destinoData.data().descripcion,
          categorias: destinoData.data().categorias,
          servicios: destinoData.data().servicios,
          actividades: destinoData
            .data()
            .actividades.map(actividad => actividad.nombre),
          latitud: destinoData.data().latitud,
          longitud: destinoData.data().longitud,
          idEstado: destinoData.data().idEstado,
          idCiudad: destinoData.data().idCiudad,
          direccion: destinoData.data().direccion,
          imagen: destinoData.data().imagen,
          deshabilitar: destinoData.data().deshabilitar
        });
      });
      console.log(this.destinos);
    });
    this.HotelSV.getAll().subscribe(hoteles => {
      hoteles.docs.map(hotel => {
        this.hoteles.push({ ...hotel.data(), id: hotel.id });
      });
    });
    this.ReservaSV.getAll().subscribe(reservasSnapshot => {
      this.reservas = [];
      reservasSnapshot.docs.forEach((reservaData: any) => {
        this.reservas.push({
          id: reservaData.id,
          itinerario: reservaData
            .data()
            .itinerario.map(itinerario => itinerario.nombre)
        });
      });
      console.log(this.reservas);
    });
  }

  esconder = true;

  public aparecerGraficos() {
    this.esconder = false;
    console.log(this.esconder);
  }

  public numerito: number;
  public prueba = [];
  public valores() {
    for (let index = 0; index < this.reservas.length; index++) {
      if (this.numerito == 1) {
        this.prueba[index] = this.reservas[index].itinerario;
        this.numerito = 0;
      } else if (this.numerito == 0) {
        for (let j = 0; j < this.reservas.length; j++) {
          if (this.reservas[index] == this.reservas[j + 1]) {
            this.numerito = 1;
          }
        }
      }
    }
  }

  // Primer Grafico
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65], label: "Series A" },
    { data: [28], label: "Series B" },
    { data: [100], label: "Series C" }
  ];
  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === "bar" ? "line" : "bar";
  }

  //2do Grafico
  // PolarArea
  public polarAreaChartLabels: Label[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail Sales",
    "Telesales",
    "Corporate Sales"
  ];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = "polarArea";
}
