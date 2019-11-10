import { Injectable } from '@angular/core';
import {FirestoreService} from '../firebase/firebase.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  collectionPath = 'reservas';

  constructor(
    private fireStroreSV: FirestoreService
  ) {}

  public create(data) {
    return this.fireStroreSV.create(this.collectionPath, data);
  }

  public getReserva(documentId: string) {
    return this.fireStroreSV.getDoc(this.collectionPath, documentId);
  }
  
  public getAll() {
    return this.fireStroreSV.getAll(this.collectionPath);
  }
  
  public update(documentId: string, data: any) {
    return this.fireStroreSV.update(this.collectionPath, documentId, data);
  } 
}
