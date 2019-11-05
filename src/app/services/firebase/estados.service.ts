import { Injectable } from '@angular/core';
import {FirestoreService} from '../firebase/firebase.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  collectionPath = 'estados';

  constructor(
    private fireStroreSV: FirestoreService
  ) {}

  public create(data) {
    return this.fireStroreSV.create(this.collectionPath, data)
  }

  public getEstado(collection, documentId: string) {
    return this.fireStroreSV.getDoc(this.collectionPath, documentId);
  }
  
  public getAll(collection) {
    return this.fireStroreSV.getAll(collection);
  }
  
  public update(collection, documentId: string, data: any) {
    return this.fireStroreSV.update(collection, documentId, data);
  }
  
}
