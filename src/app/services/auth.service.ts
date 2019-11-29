import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const admin = localStorage.getItem('admin');
    if(!this.jwtHelper.isTokenExpired(admin)) {
      return false;
    }
    else{return true;};
  }
}
