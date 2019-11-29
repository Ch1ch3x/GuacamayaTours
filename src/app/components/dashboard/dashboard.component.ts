import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
import { Title } from '@angular/platform-browser';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { HotelesService } from 'src/app/services/firebase/hoteles.service';
import { TipoHabitacionService } from 'src/app/services/firebase/tipo-habitacion.service';
import { DestinosService } from 'src/app/services/firebase/destinos.service';
import { FirestoreService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  public tipoHabitaciones = [];
  public hoteles = [];
  public destinos = [];
  public reservas = [];

  constructor(private adminService: AdminService, private router: Router, private titleService: Title) {}
  ngOnInit() {
  }


  public setTitle(title) {
    this.titleService.setTitle(title);
  }

  public salirSesion() {
    localStorage.removeItem("admin")
  }
}
