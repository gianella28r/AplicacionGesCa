import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Notas } from '../../models/notas';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import firebase from 'firebase';

/*
  Generated class for the NotasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotasProvider {

  notaCollection:AngularFirestoreCollection<Notas>;
  notaCollectionRecordatorio:AngularFirestoreCollection<Notas>;
  notaDoc:AngularFirestoreDocument<Notas>;
  notas:Observable<Notas[]>;
  notasRecordatorio:Observable<Notas[]>;
  nota:Observable<Notas>;
  constructor(private afs: AngularFirestore) {
   
  }
  ngOnInit() {
    
  }
  //añade una nota a la coleccion de firestore Notas
  addNewNota(nota:Notas){
    console.log('Hello NotasProvider Provider');
    let currentUser = firebase.auth().currentUser;
    //this.clienteCollection= this.afs.collection('Clientes', ref=>ref);
    this.notaCollection= this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Notas', ref=>ref.orderBy('fechaPublicacion','desc'));
    this.notaCollection.add(nota);
  }

  //metodo para obtener todas las notas de la base de datos
  getAllNotas():Observable<Notas[]>{
    console.log('Hello NotasProvider Provider');
    let currentUser = firebase.auth().currentUser;
    //this.clienteCollection= this.afs.collection('Clientes', ref=>ref);
    this.notaCollection= this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Notas', ref=>ref.where("estadoNota", "==", true).orderBy('fechaPublicacion','desc'));
    this.notas=this.notaCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action=>{
        const data=action.payload.doc.data() as Notas;
        data.id=action.payload.doc.id;
        return data;
      });
    });
    return this.notas;
  }

  //función para obtener una nota específica de la base de datos firestore
  getOneNota(idNota:string){
    let currentUser = firebase.auth().currentUser;
    this.notaDoc= this.afs.doc<Notas>(`Usuarios/${currentUser.uid}/Notas/${idNota}`);//no son comilas es template literals
    this.nota=this.notaDoc.snapshotChanges().map(action=>{
      if(action.payload.exists==false){
        return null;
      }else{
        const data=action.payload.data() as Notas;
        data.id=action.payload.id;
        return data;
      }
    });
    return this.nota;
  }

  //metodo para actualizar nota en la base de datos
  updateNota(nota:Notas){
    let currentUser = firebase.auth().currentUser;
    this.notaDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Notas/${nota.id}`);
    this.notaDoc.update(nota);
  }

  //metodo para eliminar nota de la base de datos
  deleteNota(nota){
    let currentUser = firebase.auth().currentUser;
    this.notaDoc= this.afs.doc<Notas>(`Usuarios/${currentUser.uid}/Notas/${nota.id}`);
    this.notaDoc.delete();
  }

    //metodo para obtener todas las notas de la base de datos
  getAllNotasRecordatorio(fecha:any):Observable<Notas[]>{
      //let fecha="2019-11-30";
    let currentUser = firebase.auth().currentUser;
    this.notaCollectionRecordatorio = this.afs.collection('Usuarios').doc( currentUser.uid)
      .collection('Notas', ref=>ref.where("estadoNota", "==", true).where('fechaAviso', '==', fecha));
      //this.notas = this.notaCollection.valueChanges();
    
    this.notasRecordatorio=this.notaCollectionRecordatorio.snapshotChanges()
      .map(changes => {
        return changes.map(action=>{
          const data=action.payload.doc.data() as Notas;
          data.id=action.payload.doc.id;
          return data;
      } );
    });
    return this.notasRecordatorio;
  }
  updateNotaBorrado(nota:any){
    let currentUser = firebase.auth().currentUser;
    this.notaDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Notas/${nota.id}`);
    return this.notaDoc.update({
      estadoNota:false
    })
   .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }
}
