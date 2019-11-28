import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ɵConsole
} from "@angular/core";
import {
  BsModalService,
  BsModalRef,
  ModalDirective
} from "ngx-bootstrap/modal";
import { AdminService } from "src/app/services/admin.service";
import * as crypto from "crypto-js";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private adminService: AdminService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {}

  public setTitle(title) {
    this.titleService.setTitle(title);
  }


}
