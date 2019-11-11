import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal/public_api';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  constructor(
    private modalService: BsModalService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
