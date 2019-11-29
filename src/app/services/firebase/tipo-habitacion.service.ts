import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase.service';

@Injectable({
  providedIn: "root"
})
export class TipoHabitacionService {
  collectionPath = "tipoHabitacion";

  constructor(private fireStroreSV: FirestoreService) {}

  public create(data) {
    return this.fireStroreSV.create(this.collectionPath, data);
  }

  public getHabitacion(documentId: string) {
    return this.fireStroreSV.getDoc(this.collectionPath, documentId);
  }

  public getAll() {
    return this.fireStroreSV.getAll(this.collectionPath);
  }

  public update(documentId: string, data: any) {
    return this.fireStroreSV.update(this.collectionPath, documentId, data);
  }

  public actualizar(documentId: string, data: any) {
    return this.fireStroreSV.actualizar(this.collectionPath, documentId, data);
  }
}
