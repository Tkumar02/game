import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SecretServiceService {

  constructor(private afs: AngularFirestore) { }

  // submitGroup(form:any){
  //   this.afs.collection('ssGroup').add(form)
  // }

  // submitMembers(data:any){
  //   this.afs.collection('members').add(data)
  // }

  submitGroup(form: any, data:any) {
    // Add the group data to the 'ssGroup' collection
    this.afs.collection('ssGroup').add(form).then((groupDocRef) => {
      // Use the group document reference to add members to a subcollection
      this.afs.collection(`ssGroup/${groupDocRef.id}/members`).add(data);
    });
  }

  loadGroup(){
    return this.afs.collection('ssGroup').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {data,id}
        })
      }) 
    )
  }
  
  loadMembers(groupName:string){
    return this.afs.collection('ssGroup', ref=>ref.where('groupName','==',groupName)).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data()
          const id=a.payload.doc.id
          return {data,id}
        })
      })
    )
  }

  loadPairings(id:string){
    return this.afs.collection(`ssGroup/${id}/pairings`).valueChanges();
  }

  loadNames(id:string){
    return this.afs.collection(`ssGroup/${id}/members`).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data()
          const id=a.payload.doc.id
          return {data,id}
        })
      })
    )
  }

  updateMemberList(groupID:string, membersID:string, data:any){
    this.afs.doc(`ssGroup/${groupID}/members/${membersID}`).update({
      memberNames: data
    })
  }

  updatePairings(groupID:string, data:any){
    this.afs.collection(`ssGroup/${groupID}/pairings`).add(data)
  }
  
}
