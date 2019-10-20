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
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
