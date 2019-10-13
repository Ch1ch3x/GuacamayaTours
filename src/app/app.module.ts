import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HotelListComponent } from './components/user/hotel-list/hotel-list.component';
import { RegionListComponent } from './components/user/region-list/region-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HotelListComponent,
    RegionListComponent,
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
