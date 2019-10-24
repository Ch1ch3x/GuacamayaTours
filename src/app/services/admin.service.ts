import { Injectable } from "@angular/core";
import * as admin from "../data/admin.json";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor() {}
  //password is Guacamayacustica123.
  login(password) {
    if (admin.secretKey === password) return true;
    return false;
  }
}
