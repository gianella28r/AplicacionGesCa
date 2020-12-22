import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { Dashboard } from '../../models/dashboard';
/*
  Generated class for the DashboardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DashboardProvider {
  dashboardCollection:AngularFirestoreCollection<Dashboard>;
  dashboardDoc:AngularFirestoreDocument<Dashboard>;
  dashboard:Observable<Dashboard>;
  currentUser: firebase.User;
  constructor(private afs: AngularFirestore) {
    console.log('Hello DashboardProvider Provider');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        //this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }

   //metodo para poder obtener los datos del dashboard
   getDatosDashboard(){
    this.dashboardDoc= this.afs.doc<Dashboard>(`Usuarios/${this.currentUser.uid}/Dashboard/${this.currentUser.uid}`);//no son comilas es template literals
    this.dashboard=this.dashboardDoc.snapshotChanges().map(action=>{
      if(action.payload.exists==false){
        return null;
      }else{
        const data=action.payload.data() as Dashboard;
        data.uid=action.payload.id;
        return data;
      }
    });
    return this.dashboard;
  }


  //metodo para actualizar el numero de clientes
  updateUsuarioContadorClientes(numeroClientes:any,numeroV:any,numeroC:any,sumaVen:any,sumaCo:any){
    this.dashboardDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}/Dashboard/${this.currentUser.uid}`);
    return this.dashboardDoc.update({
      contadorClientes: numeroClientes,
      contadorVentas:numeroV,
      contadorCobros:numeroC,
      totalVendido:sumaVen,
      totalCobrado:sumaCo
    })
  .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }

   //metodo para actualizar el numero de clientes
   updateUsuarioContadorCliente(numeroClientes:any){
    this.dashboardDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}/Dashboard/${this.currentUser.uid}`);
    return this.dashboardDoc.update({
      contadorClientes: numeroClientes,
    })
  .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }

   //metodo para actualizar el numero de notas
   updateUsuarioContadorNotas(numeroNotas:any){
    this.dashboardDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}/Dashboard/${this.currentUser.uid}`);
    return this.dashboardDoc.update({
      contadorNotas: numeroNotas
    })
  .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }

   //metodo para actualizar el numero de productos
   updateUsuarioContadorProductos(numeroProductos:any){
    this.dashboardDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}/Dashboard/${this.currentUser.uid}`);
    return this.dashboardDoc.update({
      contadorProductos: numeroProductos
    })
  .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }

  //metodo para actualizar el total de cobros
  updateUsuarioTotalCobros(numeroCobros:any,totalCobros:any){
    this.dashboardDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}/Dashboard/${this.currentUser.uid}`);
    return this.dashboardDoc.update({
      contadorCobros:numeroCobros,
      totalCobrado: totalCobros
    })
  .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }

  //metodo para actualizar el total de vendido
  updateUsuarioTotalVentasCredito(numeroVentas:any,totalVentas:any){
    this.dashboardDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}/Dashboard/${this.currentUser.uid}`);
    return this.dashboardDoc.update({
      contadorVentas:numeroVentas,
      totalVendido:totalVentas
    })
  .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }

  //metodo para actualizar el total de vendido
  updateUsuarioTotalVentas(numeroProductos:any,numeroVentas:any,numeroCobros:any,totalVentas:any,sumaCobrado:any){
    this.dashboardDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}/Dashboard/${this.currentUser.uid}`);
    return this.dashboardDoc.update({
      contadorProductos:numeroProductos,
      contadorVentas:numeroVentas,
      contadorCobros:numeroCobros,
      totalVendido:totalVentas,
      totalCobrado:sumaCobrado
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
