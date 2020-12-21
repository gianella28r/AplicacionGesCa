import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController} from 'ionic-angular';
import { RegistroProductoPage } from '../registro-producto/registro-producto';
import { ProductosProvider } from '../../providers/productos/productos';
import { Productos } from '../../models/productos';
import {EditarProductoPage} from '../editar-producto/editar-producto';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Dashboard } from '../../models/dashboard';

/**
 * Generated class for the ProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage implements OnInit  {
  productos:Productos[];
  listaProductos:Productos[];

  dashboard:Dashboard ={
    uid:'',
    contadorClientes:0,
    contadorNotas:0,
    contadorProductos:0,
    contadorVentas:0,
    contadorCobros:0,
    totalVendido:'0',
    totalCobrado:'0',
  };
  numeroProductos: number;
  constructor(public navCtrl: NavController,
    private productof:ProductosProvider,public alertCtrl: AlertController,public dashboardf: DashboardProvider, private socialSharing: SocialSharing) {
  }

  ngOnInit(){ //se ejecuta cada vez que el componente inicia su carga
    this.allProductos();
     
  }

  //Función para obtener la lista de productos
  allProductos(){
    this.productof.getAllProductos().subscribe(productos=>{
      this.productos=productos;
      this.listaProductos=this.productos;
    });
  }

 //funcion para obtener datos del Dashboard
 detalleUsuarioDashboard(){
  this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
    this.dashboard=dashboard;
    this.numeroProductos=this.dashboard.contadorProductos;
  });
 }

  //Función que redirige a la pagina de Registro de Productos
  goToRegistroDeProducto(){
    this.navCtrl.push(RegistroProductoPage);
  }

  //Función para inicializar el item de busqueda
  initiliazeItems():void{
    this.listaProductos=this.productos;
  }

  //Función para filtrar los datos 
  getItems(ev:any){
    this.initiliazeItems();
    let val=ev.target.value;
    if(val && val.trim() !=''){
      this.listaProductos=this.listaProductos.filter((producto)=>{
        return (producto.nombre.toLowerCase().indexOf(val.toLowerCase()) >-1);
      })
    }
    
  }
  //Funcion que permite compartir datos del producto
  shareProducto(nombre,precioVenta,descripcion,image ){
    let mensaje='';
    mensaje=mensaje+'Nombre:'+nombre+', '+ 'Precio: $'+precioVenta+', '+'Descripcion:'+descripcion;
        this.socialSharing.share(mensaje, null, image, null).then(() => {
          // Success!
        }).catch(() => {
          // Error!
        });
  }

  //Función que redirige a la pagina de Editar Producto
  editarProducto(idProducto:string){
    this.navCtrl.push(EditarProductoPage,{ idProducto});
  }
  
  //Función para eliminar un Producto
  goToEliminarProducto(producto){
    this.detalleUsuarioDashboard();
    let alert = this.alertCtrl.create({
     title: 'Confirmar eliminación',
     message: '¿Está seguro de que desea eliminar este producto?',
     buttons: [
       {
         text: 'No',
         role: 'cancel',
         handler: () => {
           // Ha respondido que no así que no hacemos nada
         }
       },
       {
         text: 'Si',
         handler: () => {
              // AquÍ borramos el sitio en la base de datos
              if(producto.image!="assets/imgs/nimg.jpg"){
               this.productof.deleteImagen(producto.image);
              } 
              this.numeroProductos=this.numeroProductos-1;
              this.dashboardf.updateUsuarioContadorProductos(this.numeroProductos);
            this.navCtrl.setRoot(ProductosPage);
            this.productof.deleteProducto(producto);
             
          }
       }
     ]
   });
   alert.present();
 }
}
