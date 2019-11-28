import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
import { Title } from '@angular/platform-browser';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {



  constructor(private adminService: AdminService, private router: Router, private titleService: Title) {}
  ngOnInit() {
  }
  public setTitle(title){
    this.titleService.setTitle(title);
  }
// Primer Grafico
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011'];
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
