import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Productos } from '../../models/productos';
import { AlertController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import * as firebase from 'firebase/app';
import 'firebase/storage';

/*
  Generated class for the ProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosProvider {
  productoCollection:AngularFirestoreCollection<Productos>;
  productoDoc:AngularFirestoreDocument<Productos>;
  productos:Observable<Productos[]>;
  producto:Observable<Productos>;
  downloadURL:Observable<string>;
  productoFiltroCollection: AngularFirestoreCollection<Productos>;
  productosFiltro: Observable<Productos[]>;
  constructor(private afs: AngularFirestore, private alert:AlertController) {
    console.log('Hello ProductosProvider Provider');
    let currentUser = firebase.auth().currentUser;
    this.productoCollection= this.afs.collection('Usuarios').doc(currentUser.uid)
    .collection('Productos', ref=>ref.orderBy('nombre','asc'));
  }
  ngOnInit() {
    
  }
  //Método para añadir un producto  a la coleccion Producto en la Base de datos Cloud Firestore
  addNewProducto(producto:Productos){
    console.log('Hello ProductosProvider Provider');
    let currentUser = firebase.auth().currentUser;
    this.productoCollection= this.afs.collection('Usuarios').doc(currentUser.uid)
    .collection('Productos', ref=>ref.orderBy('nombre','asc'));
    this.productoCollection.add(producto);
  }

  addNewProductoVentas(nombreProducto:any, precioProductoVenta:any,captureDataUrl:any){
    console.log('Hello ProductosProvider Provider');
    let currentUser = firebase.auth().currentUser;
    this.productoCollection= this.afs.collection('Usuarios').doc(currentUser.uid)
    .collection('Productos', ref=>ref.orderBy('nombre','asc'));
    this.productoCollection.add({
    nombre:nombreProducto,
    precioVenta:precioProductoVenta,
    precioTransformado:precioProductoVenta ,
    descripcion:'',
    image:captureDataUrl,
    idImagen:captureDataUrl});
  }
  
  
  //Método para listar todos los productos de la coleccion Producto almacenado en la Base de datos Cloud Firestore
  getAllProductos():Observable<Productos[]>{
    console.log('Hello ProductosProvider Provider');
    let currentUser = firebase.auth().currentUser;
    this.productoCollection= this.afs.collection('Usuarios').doc(currentUser.uid)
    .collection('Productos', ref=>ref.orderBy('nombre','asc'));
    this.productos=this.productoCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action=>{
        const data=action.payload.doc.data() as Productos;
        data.id=action.payload.doc.id;
        return data;
      });
    });
    return this.productos;
  }

 //Método para obtener un producto de la coleccion Producto de la Base de datos Cloud Firestore
  getOneProducto(idProducto:string){
    let currentUser = firebase.auth().currentUser;
    this.productoDoc= this.afs.doc<Productos>(`Usuarios/${currentUser.uid}/Productos/${idProducto}`);//no son comilas es template literals
    this.producto=this.productoDoc.snapshotChanges().map(action=>{
      if(action.payload.exists==false){
        return null;
      }else{
        const data=action.payload.data() as Productos;
        data.id=action.payload.id;
        return data;
      }
    });
    return this.producto;
  }

  //Método para obtener un producto de la coleccion Producto de la Base de datos Cloud Firestore
 /* getOneProductos(nombreProducto:any):Observable<Productos[]>{//metodo para obtener todos los clientes con cuentas al corriente
      let currentUser = firebase.auth().currentUser;
      this.productoFiltroCollection = this.afs.collection('Usuarios').doc( currentUser.uid)
        .collection('Productos', ref=>ref.where('nombre', '==', nombreProducto));
      
      this.productosFiltro=this.productoFiltroCollection.snapshotChanges()
        .map(changes => {
          return changes.map(action=>{
            const data=action.payload.doc.data() as Productos;
            data.id=action.payload.doc.id;
            return data;
        } );
      });
      return this.productosFiltro;
     
    }*/

  //Método para actualizar un producto de la coleccion Producto de la Base de datos Cloud Firestore
  updateProducto(producto:Productos){
    console.log(producto+'idpRODUCTO provider');
    let currentUser = firebase.auth().currentUser;
    this.productoDoc= this.afs.doc(`Usuarios/${currentUser.uid}/Productos/${producto.id}`);
    this.productoDoc.update(producto);
  }

  //Método para eliminar un producto de la coleccion Producto de la Base de datos Cloud Firestore
  deleteProducto(producto){
    let currentUser = firebase.auth().currentUser;
    this.productoDoc= this.afs.doc<Productos>(`Usuarios/${currentUser.uid}/Productos/${producto.id}`);
    this.productoDoc.delete();
  }

   //Método para subir la imagen a Firebase Storage
  uploadImagen(captureDataUrl:any){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);

      // Create a reference to 'images/todays-date.jpg'
      const imageRef = storageRef.child(`images/${filename}.jpg`);
      
      imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot)=> {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
            reject(err);
      })
    })
  }

 //Método para eliminar una imagen de Firebase Storage
  deleteImagen(imgUrl:any){
    var desertRef = firebase.storage().refFromURL(imgUrl)
    desertRef.delete().then(function() {
      //alert('borrado imagen');
    }).catch(function(error) {
      //alert('borrado no');
    });
  }
}
