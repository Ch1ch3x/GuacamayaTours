import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HotelListComponent } from './components/user/hotel-list/hotel-list.component';
import { RegionListComponent } from './components/user/region-list/region-list.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HotelListComponent,
    RegionListComponent,
    HomeHeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
