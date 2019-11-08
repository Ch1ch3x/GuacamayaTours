import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {


  constructor(
    private fireStoreSV: AngularFirestore
  ) {}

  public create(collection, data) {
    return this.fireStoreSV.collection(collection).add(data);
  }

  public getDoc(collection, documentId: string) {
    return this.fireStoreSV.collection(collection).doc(documentId).snapshotChanges();
  }
  
  public getAll(collection) {
    return this.fireStoreSV.collection(collection).snapshotChanges();
  }
  
  public update(collection, documentId: string, data: any) {
    return this.fireStoreSV.collection(collection).doc(documentId).set(data);
  }
}
