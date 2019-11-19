import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.scss']
})
export class DestinoComponent implements OnInit {
  private categorias: any[] = [];
  private destino: any;
  ciudad: any;
  estado: any;
  private destinoId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fireStoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.destinoId = this.route.snapshot.params["id"];

    this.fireStoreService.getDoc("destinos", this.destinoId).subscribe(hotel => {
      this.fireStoreService
        .getAll("categorias")
        .subscribe(destino => {
          this.destino = { ...hotel.payload.data(), id: hotel.payload.id };
          this.fireStoreService
            .getDoc("ciudades", this.destino.idCiudad)
            .subscribe((ciudad: any) => {
              this.destino.ciudad = ciudad.payload.data().nombre;
              this.fireStoreService
                .getDoc("estados", this.destino.idEstado)
                .subscribe((estado: any) => {
                  this.destino.estado = estado.payload.data().nombre;  
                  console.log(this.destino);      
                  this.categorias = destino.docs
                    .map(doc => ({ ...doc.data(), id: doc.id }))
                    .filter(cat =>
                      this.destino.categorias.some(
                        c => c.categorias == cat.id
                      )
                    );
                });
            });
        });
    });

}
}
