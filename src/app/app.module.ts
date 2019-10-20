import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HotelListComponent } from "./components/user/hotel-list/hotel-list.component";
import { RegionListComponent } from "./components/user/region-list/region-list.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NgImageSliderModule } from "ng-image-slider";
import { HomeComponent } from "./components/home/home.component";
import { AppRoutingModule } from "./routing/routing.module";
import { HeaderComponent } from "./components/header/header.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HotelListComponent,
    RegionListComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [BrowserModule, NgImageSliderModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
