import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { Clientes } from '../../models/clientes';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';


/*

  Generated class for the ClientesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientesProvider {
  clienteCollection:AngularFirestoreCollection<Clientes>;
  clienteCincoCollection:AngularFirestoreCollection<Clientes>;
  clienteCuentaCobrarCollection:AngularFirestoreCollection<Clientes>;
  clienteCuentaCorrienteCollection:AngularFirestoreCollection<Clientes>;
  clienteCuentaProximasCollection:AngularFirestoreCollection<Clientes>;
  clienteCuentaPorVencerCollection:AngularFirestoreCollection<Clientes>;
  clienteCuentaVencidasCollection:AngularFirestoreCollection<Clientes>;
  clienteVentasCollection:AngularFirestoreCollection<Clientes>;
  clienteDoc:AngularFirestoreDocument<Clientes>;
  clienteDashDoc:AngularFirestoreDocument<Clientes>;
  clienteVentasDoc:AngularFirestoreDocument<Clientes>;
  clienteClieDoc:AngularFirestoreDocument<Clientes>;
  clientes:Observable<Clientes[]>;
  clientesVentas:Observable<Clientes[]>;
  clientesCorriente:Observable<Clientes[]>;
  clientesProximo:Observable<Clientes[]>;
  clientesPorVencer:Observable<Clientes[]>;
  clientesVencidas:Observable<Clientes[]>;
  clientesCinco:Observable<Clientes[]>;
  clientesCuentaCobrar:Observable<Clientes[]>;
  cliente:Observable<Clientes>;
  afAuth: any;


  constructor(private afs: AngularFirestore, private authf:AuthProvider){
    
    
  }
  ngOnInit() {
   
    
  }

  //metodo para añadir nuevo cliente
  addNewCliente(cliente:Clientes){
    let currentUser = firebase.auth().currentUser;
    console.log('Hello ClientesProvider Provider'+currentUser);
    //this.clienteCollection= this.afs.collection('Clientes', ref=>ref);
    this.clienteCollection= this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Clientes', ref=>ref.orderBy('nombres','asc'));
    this.clienteCollection.add(cliente);
  }
  
  //metodo para obtner todos los clientes
  getAllClientes():Observable<Clientes[]>{
    let currentUser = firebase.auth().currentUser;
    console.log('Hello ClientesProvider Provider'+currentUser);
    //this.clienteCollection= this.afs.collection('Clientes', ref=>ref);
    this.clienteCollection= this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Clientes', ref=>ref.orderBy('nombres','asc'));
    this.clientes=this.clienteCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action=>{
        const data=action.payload.doc.data() as Clientes;
        data.id=action.payload.doc.id;
        return data;
      });
    });
    return this.clientes;
  }

   //metodo para obtener datos del cliente
  getOneCliente(idCliente:string){
    let currentUser = firebase.auth().currentUser;
    this.clienteDoc= this.afs.doc<Clientes>(`Usuarios/${currentUser.uid}/Clientes/${idCliente}`);//no son comilas es template literals
    this.cliente=this.clienteDoc.snapshotChanges().map(action=>{
      if(action.payload.exists==false){
        return null;
      }else{
        const data=action.payload.data() as Clientes;
        data.id=action.payload.id;
        return data;
      }
    });
    return this.cliente;
     
  }

   //metodo para actualizar datos del cliente
  updateCliente(cliente:Clientes){
    let currentUser = firebase.auth().currentUser;
    this.clienteDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  //metodo para actualizar el campo adeuda de cliente
  updateClienteVenta(cliente:any, ventaTotal:any, ordenA:number){
    console.log('entroaui');
    let currentUser = firebase.auth().currentUser;
    this.clienteDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${cliente}`);
    return this.clienteDoc.update({
      adeuda: ventaTotal,
      orden:ordenA,
    })
   .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }

  //metodo para actualizar el datos de cliente
  updateClienteDatosVenta(cliente:any,numeroP:any,numeroVe:any,totalVen:any,totalCo:any){
    console.log('entroaui');
    let currentUser = firebase.auth().currentUser;
    this.clienteVentasDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${cliente}`);
    return this.clienteVentasDoc.update({
      numeroPagos:numeroP,
      numeroVentas:numeroVe,
      totalVendido:totalVen,
      totalCobrado:totalCo
    })
   .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }

   //metodo para eliminar cliente
  deleteCliente(cliente){
    let currentUser = firebase.auth().currentUser;
    this.clienteDoc= this.afs.doc<Clientes>(`Usuarios/${currentUser.uid}/Clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }

   //metodo para obtener los 5 clientes con mayor adeudo
   getTopCincoClientes():Observable<Clientes[]>{
    let currentUser = firebase.auth().currentUser;
    this.clienteCincoCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
    .collection('Clientes', ref=>ref.orderBy('orden', 'desc').limit(5));
    this.clientesCinco=this.clienteCincoCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action=>{
        const data=action.payload.doc.data() as Clientes;
        data.id=action.payload.doc.id;
        return data;
      });
    });
    return this.clientesCinco;
  }

 
  //metodo actualizar fecha de cobro y monto a cobrar
  updateFechaCoAboMo(cliente:any,fechaCo:any,abono:any,modalidadCo:any){
    let currentUser = firebase.auth().currentUser;
    this.clienteDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${cliente}`);
    return this.clienteDoc.update({
      fechaCobro:fechaCo,
      abonoCobrar:abono,
      modalidadC:modalidadCo
    })
   .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }

   //metodo para actualizar el campo adeuda de cliente
   updateClientePago(cliente:any, ventaTotal:any,ordenA:number,totalCliCo:any,numeroPa:number,fechaProximoCo:string){
    console.log('entroaui');
    let currentUser = firebase.auth().currentUser;
    this.clienteDashDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${cliente}`);
    return this.clienteDashDoc.update({
      adeuda: ventaTotal,
      orden:ordenA,
      totalCobrado:totalCliCo,
      numeroPagos:numeroPa,
      fechaCobro:fechaProximoCo
    })
   .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }
  
  //metodo para actualizar el total de cobros en cliente
  updateClienteTotalCobros(cliente:any,numeroCobros:any,sumaCobrado:any){
    let currentUser = firebase.auth().currentUser;
    this.clienteClieDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Clientes/${cliente}`);
    return this.clienteClieDoc.update({
      numeroPagos: numeroCobros,
      totalCobrado:sumaCobrado,
    })
   .then(function() {
      console.log("Document successfully updated!");
    })
  .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });
  }
  
  //metodo para obtener las ventas del cliente
  getAllClientesVentas():Observable<Clientes[]>{
    let currentUser = firebase.auth().currentUser;
    this.clienteVentasCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
      .collection('Clientes');
    
    this.clientesVentas=this.clienteVentasCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action=>{
          const data=action.payload.doc.data() as Clientes;
          data.id=action.payload.doc.id;
          return data;
      } );
    });
    return this.clientesVentas;
  }

   //metodo para obtener todos los clientes que tienen Cuentas por cobrar activas
   getAllClientesCuentasCobrar():Observable<Clientes[]>{
    let currentUser = firebase.auth().currentUser;
    this.clienteCuentaCobrarCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
      .collection('Clientes', ref=>ref.where('adeuda', '>', '0.00'));
    
    this.clientesCuentaCobrar=this.clienteCuentaCobrarCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action=>{
          const data=action.payload.doc.data() as Clientes;
          data.id=action.payload.doc.id;
          return data;
      } );
    });
    return this.clientesCuentaCobrar;
  }

  //metodo para obtener todos los clientes con cuentas al corriente
  getAllClientesCuentasCorriente():Observable<Clientes[]>{
    let currentUser = firebase.auth().currentUser;
    this.clienteCuentaCorrienteCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
      .collection('Clientes', ref=>ref.where('adeuda', '==', '0.00'));
    
    this.clientesCorriente=this.clienteCuentaCorrienteCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action=>{
          const data=action.payload.doc.data() as Clientes;
          data.id=action.payload.doc.id;
          return data;
      } );
    });
    return this.clientesCorriente;
  }

  //metodo para obtener todos los clientes con cuentas proximas a pagarse
  getAllClientesCuentasProximas(fecha:any):Observable<Clientes[]>{
    let currentUser = firebase.auth().currentUser;
    this.clienteCuentaProximasCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
      .collection('Clientes', ref=>ref.where('fechaCobro', '>',fecha));
    
    this.clientesProximo=this.clienteCuentaProximasCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action=>{
          const data=action.payload.doc.data() as Clientes;
          data.id=action.payload.doc.id;
          return data;
      } );
    });
    return this.clientesProximo;
  }

  //metodo para obtener todos los clientes con cuentas proximas por vencer
  getAllClientesCuentasPorVencer(fecha:any):Observable<Clientes[]>{
    let currentUser = firebase.auth().currentUser;
    this.clienteCuentaPorVencerCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
      .collection('Clientes', ref=>ref.where('fechaCobro', '==', fecha));
    
    this.clientesPorVencer=this.clienteCuentaPorVencerCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action=>{
          const data=action.payload.doc.data() as Clientes;
          data.id=action.payload.doc.id;
          return data;
      } );
    });
    return this.clientesPorVencer;
  }
  
   //metodo para obtener todos los clientes que tienen cuentas por cobrar vencidas
   getAllClientesCuentasVencidas(fecha:any):Observable<Clientes[]>{
    let currentUser = firebase.auth().currentUser;
    this.clienteCuentaVencidasCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
      .collection('Clientes', ref=>ref.where('fechaCobro', '<', fecha));
    
    this.clientesVencidas=this.clienteCuentaVencidasCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action=>{
          const data=action.payload.doc.data() as Clientes;
          data.id=action.payload.doc.id;
          return data;
      } );
    });
    return this.clientesVencidas;
  }

  

}