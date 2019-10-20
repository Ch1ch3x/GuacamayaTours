import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NgImageSliderModule } from "ng-image-slider";
import { HomeComponent } from "./components/home/home.component";
import { AppRoutingModule } from "./routing/routing.module";
import { HeaderComponent } from "./components/header/header.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HotelesComponent } from "./components/hoteles/hoteles.component";
import { DestinosTuristicosComponent } from "./components/destinos-turisticos/destinos-turisticos.component";
import { CategoriaDestinoComponent } from "./components/categoria-destino/categoria-destino.component";
import { HabitacionesComponent } from "./components/habitaciones/habitaciones.component";
import { OrdenesComponent } from "./components/ordenes/ordenes.component";
import { CiudadesComponent } from "./components/ciudades/ciudades.component";
import { EstadosComponent } from "./components/estados/estados.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CrearCiudadComponent } from "./components/ciudades/CRUD/crear-ciudad/crear-ciudad.component";
import { CrearCategoriaDestinoComponent } from "./components/categoria-destino/CRUD/crear-categoria-destino/crear-categoria-destino.component";
import { CrearOrdenComponent } from "./components/ordenes/CRUD/crear-orden/crear-orden.component";
import { CrearHotelesComponent } from "./components/hoteles/CRUD/crear-hoteles/crear-hoteles.component";
import { CrearHabitacionComponent } from "./components/habitaciones/CRUD/crear-habitacion/crear-habitacion.component";
import { CrearDestinoComponent } from "./components/destinos-turisticos/CRUD/crear-destino/crear-destino.component";
import { CrearEstadoComponent } from "./components/estados/CRUD/crear-estado/crear-estado.component";
import { PlanearViajeComponent } from "./components/planear-viaje/planear-viaje.component";
import { ItinerarioComponent } from "./components/itinerario/itinerario.component";
import { NosotrosComponent } from "./components/nosotros/nosotros.component";
import { ContactanosComponent } from "./components/contactanos/contactanos.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    HotelesComponent,
    DestinosTuristicosComponent,
    CategoriaDestinoComponent,
    HabitacionesComponent,
    OrdenesComponent,
    CiudadesComponent,
    EstadosComponent,
    DashboardComponent,
    CrearDestinoComponent,
    CrearEstadoComponent,
    CrearHabitacionComponent,
    CrearHotelesComponent,
    CrearOrdenComponent,
    CrearCategoriaDestinoComponent,
    CrearCiudadComponent,
    PlanearViajeComponent,
    ItinerarioComponent,
    NosotrosComponent,
    ContactanosComponent
  ],
  imports: [BrowserModule, NgImageSliderModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
