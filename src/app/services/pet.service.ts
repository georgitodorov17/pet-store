import { Injectable } from '@angular/core';
import {Firestore,collection,collectionData,addDoc,doc,deleteDoc,updateDoc,getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private petsCollection;

  constructor(private firestore: Firestore) {
    this.petsCollection = collection(this.firestore, 'pets');
  }

  getPets(): Observable<Pet[]> {
    return collectionData(this.petsCollection, { idField: 'id' }) as Observable<Pet[]>;
  }

  async getPetById(id: string): Promise<Pet | null> {
    const petDocRef = doc(this.firestore, `pets/${id}`);
    const snapshot = await getDoc(petDocRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...(snapshot.data() as Pet) };
    }

    return null;
  }

 
  addPet(pet: Pet) {
    return addDoc(this.petsCollection, pet);
  }

 
  updatePet(id: string, pet: Partial<Pet>) {
    const petDocRef = doc(this.firestore, `pets/${id}`);
    return updateDoc(petDocRef, pet);
  }


  deletePet(id: string) {
    const petDocRef = doc(this.firestore, `pets/${id}`);
    return deleteDoc(petDocRef);
  }
}