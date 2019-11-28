import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
import { Title } from '@angular/platform-browser';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { HotelesService } from 'src/app/services/firebase/hoteles.service';
import { TipoHabitacionService } from 'src/app/services/firebase/tipo-habitacion.service';
import { DestinosService } from 'src/app/services/firebase/destinos.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  public tipoHabitaciones = [];
  public hoteles = [];
  public destinos = [];

  constructor(private adminService: AdminService, private router: Router, private titleService: Title, private HotelSV: HotelesService, private TipoHabitacionSV: TipoHabitacionService, private DestinoSV: DestinosService ) {}
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
      console.log(this.destinos)
    });
    this.HotelSV.getAll().subscribe(hoteles => {
        hoteles.docs.map(hotel=> {
        this.hoteles.push({ ...hotel.data(), id: hotel.id });
      });
    });
  }

  public setTitle(title){
    this.titleService.setTitle(title);
  }
  esconder= true;

  public aparecerGraficos() {
    this.esconder = false;
    console.log(this.esconder)
  }

  public prueba = [];
  public valores() {
    for (let index = 0; index < this.destinos.length; index++) {
      this.prueba[index] = this.destinos[index].nombre;
  } 
}

// Primer Grafico
  public barChartOptions: ChartOptions = { 
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = this.prueba;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27], label: 'Series B' },
    { data: [7, 4, 10, 59, 47, 15], label: 'Series C' }
  ];
    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public randomize(): void {
      this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    }

    //2do Grafico
     // PolarArea
  public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

}
