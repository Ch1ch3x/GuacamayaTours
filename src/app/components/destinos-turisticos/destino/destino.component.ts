import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FirestoreService } from "src/app/services/firebase/firebase.service";

@Component({
  selector: "app-destino",
  templateUrl: "./destino.component.html",
  styleUrls: ["./destino.component.scss"]
})
export class DestinoComponent implements OnInit {
  private categorias: any[] = [];
  private destino: any;
  ciudad: any;
  estado: any;
  private destinoId: any;
  private destinoActividades: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.destinoId = this.route.snapshot.params["id"];

    this.fireStoreService
      .getDoc("destinos", this.destinoId)
      .subscribe(destino => {
        this.fireStoreService.getAll("categorias").subscribe(categorias => {
          this.destino = { ...destino.payload.data(), id: destino.payload.id };
          this.destinoActividades = this.destino.actividades;
          this.fireStoreService
            .getDoc("ciudades", this.destino.idCiudad)
            .subscribe((ciudad: any) => {
              this.destino.ciudad = ciudad.payload.data().nombre;
              this.fireStoreService
                .getDoc("estados", this.destino.idEstado)
                .subscribe((estado: any) => {
                  this.destino.estado = estado.payload.data().nombre;
                  this.categorias = categorias.docs
                    .map(doc => ({ ...doc.data(), id: doc.id }))
                    .filter(categoria =>
                      this.destino.categorias.some(c => c == categoria.id)
                    );
                });
            });

          this.fireStoreService.getAll("actividades").subscribe(actividades => {
            this.destinoActividades = actividades.docs
              .filter(actividad =>
                this.destinoActividades.some(da => da === actividad.id)
              )
              .map(destinoActividad => ({
                ...destinoActividad.data(),
                id: destinoActividad.id
              }));
            console.log(this.destinoActividades);
          });
        });
      });
  }
}
