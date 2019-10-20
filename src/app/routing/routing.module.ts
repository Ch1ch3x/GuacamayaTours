import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { NotFoundComponent } from "../components/not-found/not-found.component";
import { HotelesComponent } from "../components/hoteles/hoteles.component";
import { DestinosTuristicosComponent } from "../components/destinos-turisticos/destinos-turisticos.component";
import { CategoriaDestinoComponent } from "../components/categoria-destino/categoria-destino.component";
import { HabitacionesComponent } from "../components/habitaciones/habitaciones.component";
import { OrdenesComponent } from "../components/ordenes/ordenes.component";
import { CiudadesComponent } from "../components/ciudades/ciudades.component";
import { EstadosComponent } from "../components/estados/estados.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { ItinerarioComponent } from "../components/itinerario/itinerario.component";
import { NosotrosComponent } from "../components/nosotros/nosotros.component";
import { ContactanosComponent } from "../components/contactanos/contactanos.component";
import { CrearHotelesComponent } from "../components/hoteles/CRUD/crear-hoteles/crear-hoteles.component";
import { CrearDestinoComponent } from "../components/destinos-turisticos/CRUD/crear-destino/crear-destino.component";
import { CrearCategoriaDestinoComponent } from "../components/categoria-destino/CRUD/crear-categoria-destino/crear-categoria-destino.component";
import { CrearHabitacionComponent } from "../components/habitaciones/CRUD/crear-habitacion/crear-habitacion.component";
import { CrearOrdenComponent } from "../components/ordenes/CRUD/crear-orden/crear-orden.component";
import { CrearCiudadComponent } from "../components/ciudades/CRUD/crear-ciudad/crear-ciudad.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "hoteles", component: HotelesComponent },
  { path: "destinos", component: DestinosTuristicosComponent },
  { path: "categorias", component: CategoriaDestinoComponent },
  { path: "habitaciones", component: HabitacionesComponent },
  { path: "ordenes", component: OrdenesComponent },
  { path: "ciudades", component: CiudadesComponent },
  { path: "estados", component: EstadosComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "itinerario", component: ItinerarioComponent },
  { path: "nosotros", component: NosotrosComponent },
  { path: "contactanos", component: ContactanosComponent },
  { path: "hoteles/crear/:hotelId", component: CrearHotelesComponent },
  { path: "destinos/crear/:destinoId", component: CrearDestinoComponent },
  {
    path: "categorias/crear/:categoriaId",
    component: CrearCategoriaDestinoComponent
  },
  {
    path: "habitaciones/crear/:habitacionId",
    component: CrearHabitacionComponent
  },
  { path: "ordenes/crear/:ordenId", component: CrearOrdenComponent },
  { path: "ciudades/crear/:ciudadId", component: CrearCiudadComponent },
  { path: "estados/crear/:estadoId", component: CategoriaDestinoComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
