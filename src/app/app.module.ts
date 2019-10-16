import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HotelListComponent } from './components/user/hotel-list/hotel-list.component';
import { RegionListComponent } from './components/user/region-list/region-list.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SliderComponent } from './components/home-header/slider/slider.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HotelListComponent,
    RegionListComponent,
    HomeHeaderComponent,
    FooterComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    NgImageSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
