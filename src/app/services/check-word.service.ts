import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CheckWordService {

  constructor(private afs: AngularFirestore) { }

  sendWord(userWordData:any){
    this.afs.collection('word').add(userWordData)
  }

  loadUsers(){
    return this.afs.collection('word').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          return data
        })
      })
    )
  }

  
}
