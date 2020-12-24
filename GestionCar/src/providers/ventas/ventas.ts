import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Ventas } from '../../models/ventas';
import { FormaPago } from '../../models/formaPago';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import firebase from 'firebase';


/*
  Generated class for the VentasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VentasProvider {
  idClien:any;
  cliente:any;
  ventaCollection:AngularFirestoreCollection<Ventas>;
  ventaDiaCollection:AngularFirestoreCollection<Ventas>;
  formaPagoCollection:AngularFirestoreCollection<FormaPago>;
  ventaDoc:AngularFirestoreDocument<Ventas>;
  ventaDiaDoc:AngularFirestoreDocument<Ventas>;
  formaPagoDoc:AngularFirestoreDocument<FormaPago>;
  ventas:Observable<Ventas[]>;
  ventasDia:Observable<Ventas[]>;
  formaPagos:Observable<FormaPago[]>;
  venta:Observable<Ventas>;
  formaPago:Observable<FormaPago>;
  snapshotChangesSubscription: any;
  
  constructor(private afs: AngularFirestore) {

  }

   //metodo para añadir un documento a la coleccion ventas
  addNewVenta(venta:Ventas,idClien:any){
    let currentUser = firebase.auth().currentUser;
    this.ventaCollection= this.afs.collection('Usuarios').doc( currentUser.uid)
     .collection('Clientes').doc(idClien).collection('Ventas', ref=>ref.orderBy('fechaCompra','desc'));
     this.ventaCollection.add(venta);
     console.log(idClien);
  }
  
  //metodo para obtener los documentos de la coleccion ventas
  getAllVentas(idCliente:any):Observable<Ventas[]>{
    let currentUser = firebase.auth().currentUser;
    this.ventaCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Clientes').doc(idCliente).collection('Ventas', ref=>ref.where("estadoTransaccion", "==", true).orderBy('fechaCompra', 'desc'));
    this.ventas=this.ventaCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action=>{
        const data=action.payload.doc.data() as Ventas;
        data.id=action.payload.doc.id;
        return data;
      });
    });
    return this.ventas;
  }

  //metodo para obtener el docuemnto anterior de la coleccion ventas
  getAnteriorVenta(idCliente:any):Observable<Ventas[]>{
    let currentUser = firebase.auth().currentUser;
    this.ventaCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Clientes').doc(idCliente).collection('Ventas', ref=>ref.where("estadoTransaccion", "==", true).orderBy('fechaCompra', 'desc').limit(1));
    this.ventas=this.ventaCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action=>{
        const data=action.payload.doc.data() as Ventas;
        data.id=action.payload.doc.id;
        return data;
      });
    });
    return this.ventas;
  }

  //metodo para obtener los datos de un documento de la coleccion ventas
  getOneVenta(idCliente:any,idVenta:any){
    let currentUser = firebase.auth().currentUser;
    this.ventaDoc= this.afs.doc<Ventas>(`Usuarios/${currentUser.uid}/Clientes/${idCliente}/Ventas/${idVenta}`);//no son comilas es template literals
    this.venta=this.ventaDoc.snapshotChanges().map(action=>{
      if(action.payload.exists==false){
        return null;
      }else{
        const data=action.payload.data() as Ventas;
        data.id=action.payload.id;
        return data;
      }
    });
    return this.venta;
  }

  //metodo para actualizar los datos de un documento de la coleccion ventas
  updateVenta(venta:Ventas,idCliente:any){
    let currentUser = firebase.auth().currentUser;
    this.ventaDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${idCliente}/Ventas/${venta.id}`);
    this.ventaDoc.update(venta);
  }

  //metodo para eliminar un documento de la coleccion ventas
  deleteVenta(venta,idCliente:any){
    let currentUser = firebase.auth().currentUser;
    this.ventaDoc= this.afs.doc<Ventas>(`Usuarios/${currentUser.uid}/Clientes/${idCliente}/Ventas/${venta.id}`);
    this.ventaDoc.delete();
  } 

  //metodo para añadir un documento a la coleccion Forma de pago
  addNewFormaPago(formaPago:FormaPago,idClien:any){
    let currentUser = firebase.auth().currentUser;
    this.formaPagoCollection= this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Clientes').doc(idClien).collection('FormaPago');
     this.formaPagoCollection.add(formaPago);
  }

  //metodo para obtener documento de la coleccion Forma de pago
  getFormaPago(idCliente:any):Observable<FormaPago[]>{
    let currentUser = firebase.auth().currentUser;
    this.formaPagoCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Clientes').doc(idCliente).collection('FormaPago', ref=>ref.orderBy('adeuda', 'asc').limit(1));
    this.formaPagos=this.formaPagoCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action=>{
        const data=action.payload.doc.data() as FormaPago;
        data.id=action.payload.doc.id;
        return data;
      });
    });
    return this.formaPagos;
  }

  //metodo para actualizar un documento de la coleccion Forma de pago
  updateFormaPago(formaP:FormaPago,idCliente:any){
    let currentUser = firebase.auth().currentUser;
    this.formaPagoDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${idCliente}/FormaPago/${formaP.id}`);
    this.formaPagoDoc.update(formaP);
  }

  //metodo para eliminar documento de la coleccion Forma de pago
  deleteFormaPago(idCliente:any,idFormaP:any){
    let currentUser = firebase.auth().currentUser;
    this.formaPagoDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${idCliente}/FormaPago/${idFormaP}`);
    this.formaPagoDoc.delete();
  }

  //metodo para eliminar todos los documentos de la coleccion Ventas
  deleteVentas(idCliente:any){
    let currentUser = firebase.auth().currentUser;
    var query = firebase.firestore().collection('Usuarios').doc( currentUser.uid).collection('Clientes').doc(idCliente).collection('Ventas').orderBy('fechaCompra', 'desc');
      query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
      });
    });
  }

  //metodo para obtener todos los documentos de la coleccion ventas de acuerdo al dia
  getAllPagosDia(idCliente:any,fecha:any):Observable<Ventas[]>{
    let currentUser = firebase.auth().currentUser;
    this.ventaDiaCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Clientes').doc(idCliente).collection('Ventas', ref=>ref.where("estadoTransaccion", "==", true).where('fechaPago', '==', fecha));
    
    this.ventasDia=this.ventaDiaCollection .snapshotChanges()
      .map(changes => {
        return changes.map(action=>{
          const data=action.payload.doc.data() as Ventas;
          data.id=action.payload.doc.id;
          return data;
      } );
    });
    return this.ventasDia;
  }

  //metodo para actualizar el total de cobros en cliente
  updateVentaBorrado(venta:any,idCliente){
    let currentUser = firebase.auth().currentUser;
    this.ventaDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${idCliente}/Ventas/${venta.id}`);
    return this.ventaDoc.update({
      estadoTransaccion:false
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
