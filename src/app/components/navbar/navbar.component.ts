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

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  password = new FormControl("", [Validators.required]);
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  signIn() {
    if (
      this.adminService.login(
        crypto.SHA256(this.password.value, "guacamaya").toString()
      )
    ) {
      this.modalRef.hide();
      this.router.navigate(["/admin/dashboard", {}]);
    } else alert("Invalid password");
  }

  getErrorMessage() {
    return this.password.hasError("required") ? "You must enter a value" : "";
  }
}
