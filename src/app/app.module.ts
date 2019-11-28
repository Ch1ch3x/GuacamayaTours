import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NgImageSliderModule } from "ng-image-slider";
import { CommonModule } from "@angular/common";
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
import { CrearCiudadComponent } from "./components/ciudades/CRUD/crear/crear-ciudad.component";
import { CrearCategoriaDestinoComponent } from "./components/categoria-destino/CRUD/crear/crear-categoria-destino.component";
import { CrearOrdenComponent } from "./components/ordenes/CRUD/crear/crear-orden.component";
import { CrearHabitacionComponent } from "./components/habitaciones/CRUD/crear/crear-habitacion.component";
import { CrearEstadoComponent } from "./components/estados/CRUD/crear/crear-estado.component";
import { PlanearViajeComponent } from "./components/planear-viaje/planear-viaje.component";
import { ItinerarioComponent } from "./components/itinerario/itinerario.component";
import { NosotrosComponent } from "./components/nosotros/nosotros.component";
import { ContactanosComponent } from "./components/contactanos/contactanos.component";
import { CrearHotelComponent } from "./components/hoteles/CRUD/crear/crear-hotel.component";
import { ActualizarCategoriaDestinoComponent } from "./components/categoria-destino/CRUD/actualizar/actualizar-categoria-destino.component";
import { ActualizarCiudadComponent } from "./components/ciudades/CRUD/actualizar/actualizar-ciudad.component";
import { ActualizarEstadoComponent } from "./components/estados/CRUD/actualizar/actualizar-estado.component";
import { ActualizarHabitacionComponent } from "./components/habitaciones/CRUD/actualizar/actualizar-habitacion.component";
import { ActualizarHotelComponent } from "./components/hoteles/CRUD/actualizar/actualizar-hotel.component";
import { ActualizarOrdenComponent } from "./components/ordenes/CRUD/actualizar/actualizar-orden.component";
// tslint:disable-next-line: max-line-length
import { ActualizarDestinosTuristicosComponent } from "./components/destinos-turisticos/CRUD/actualizar/actualizar-destinos-turisticos.component";
import { ListarDestinosTuristicosComponent } from "./components/destinos-turisticos/CRUD/listar/listar-destinos-turisticos.component";
import { ListarEstadoComponent } from "./components/estados/CRUD/listar/listar-estado.component";
import { ListarHabitacionesComponent } from "./components/habitaciones/CRUD/listar/listar-habitaciones.component";
import { ListarHotelesComponent } from "./components/hoteles/CRUD/listar/listar-hoteles.component";
import { ListarOrdenesComponent } from "./components/ordenes/CRUD/listar/listar-ordenes.component";
import { ListaCategoriaDestinoComponent } from "./components/categoria-destino/CRUD/listar/lista-categoria-destino.component";
import { ListaCiudadComponent } from "./components/ciudades/CRUD/listar/lista-ciudad.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "ngx-bootstrap/modal";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FirestoreService } from "./services/firebase/firebase.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { HotelComponent } from './components/hoteles/hotel/hotel.component';
import { DestinoComponent } from './components/destinos-turisticos/destino/destino.component';
import { Observable } from 'rxjs';
import { DialogComponent } from './components/planear-viaje/dialog/dialog.component';
import { ChartsModule } from 'ng2-charts';
import { DinamicoComponent } from './components/graficos/dinamico/dinamico.component';

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
    CrearEstadoComponent,
    CrearHabitacionComponent,
    CrearHotelComponent,
    CrearOrdenComponent,
    CrearCategoriaDestinoComponent,
    CrearCiudadComponent,
    ActualizarCategoriaDestinoComponent,
    ActualizarCiudadComponent,
    ActualizarEstadoComponent,
    ActualizarHabitacionComponent,
    ActualizarHotelComponent,
    ActualizarOrdenComponent,
    ActualizarDestinosTuristicosComponent,
    ListarDestinosTuristicosComponent,
    ListarEstadoComponent,
    ListarHabitacionesComponent,
    ListarHotelesComponent,
    ListarOrdenesComponent,
    ListaCategoriaDestinoComponent,
    ListaCiudadComponent,
    PlanearViajeComponent,
    ItinerarioComponent,
    NosotrosComponent,
    ContactanosComponent,
    HotelComponent,
    DestinoComponent,
    DialogComponent,
    DinamicoComponent
  ],
  imports: [
    BrowserModule,
    NgImageSliderModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    ChartsModule
  ],
  providers: [FirestoreService, AngularFirestore, Title],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
