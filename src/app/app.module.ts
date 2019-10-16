import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';;
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListHotelComponent } from './components/list-hotel/list-hotel.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeHeaderComponent,
    FooterComponent,
    ListHotelComponent,

   ],
  imports: [
    BrowserModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
