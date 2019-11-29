import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['admin']);
      return true;
      console.log("entro")
    }
    return false;
    console.log("no entro")
  }
}
