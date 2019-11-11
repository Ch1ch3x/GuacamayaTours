import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {


  constructor(
    private fireStroreSV: AngularFirestore
  ) {}

  public create(collection, data) {
    return this.fireStroreSV.collection(collection).add(data);
  }

  public getDoc(collection, documentId: string) {
    return this.fireStroreSV.collection(collection).doc(documentId).snapshotChanges();
  }
  
  public getAll(collection) {
    return this.fireStroreSV.collection(collection).snapshotChanges();
  }
  
  public update(collection, documentId: string, data: any) {
    return this.fireStroreSV.collection(collection).doc(documentId).set(data);
  }
}
