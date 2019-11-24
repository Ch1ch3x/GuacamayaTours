import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
import { Title } from '@angular/platform-browser';

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
}
