import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import { Productos } from '../../models/productos';
import { ProductosProvider } from '../../providers/productos/productos';
import {ProductosPage} from '../productos/productos';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Dashboard } from '../../models/dashboard';
//import { Network } from '@ionic-native/network';

/**
 * Generated class for the RegistroProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-producto',
  templateUrl: 'registro-producto.html',
})
export class RegistroProductoPage implements OnInit  {
  
  captureDataUrl: string;
  shareImagen: any='';
  productos: Productos = {  
    id:'',
    nombre:'',
    precioVenta:'',
    descripcion:'',
    image:'',
    idImagen:'',
    precioTransformado:'',
  } 
  precioTrans: any;
  precioReal: any;

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
  constructor( public navCtrl: NavController, public navParams: NavParams,
    private productof: ProductosProvider, private camera:Camera,public dashboardf: DashboardProvider,
    private loadingCtrl: LoadingController) {
      this.captureDataUrl= "assets/imgs/nimg.jpg";
      this.shareImagen= "assets/imgs/nimg.jpg";
  }
  
  ngOnInit(){
    this.detalleUsuarioDashboard(); 
  }

  //funcion para obtener datos del Dashboard
  detalleUsuarioDashboard(){
    this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.numeroProductos=this.dashboard.contadorProductos;
    });
  }

  //funcion para dar formato al valor de precio
  transformar(valor1: any) { 
    this.precioReal=valor1;
    let strEx;
    let res:any;
    strEx = parseFloat(this.precioReal);
    res= strEx.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.precioTrans=res+'';
  }

  //funcion para tomar foto desde el celular
  goToTomarFoto(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight:1024,
      targetWidth:1024,
      correctOrientation:true,
      saveToPhotoAlbum:true,
    }).then(resultado=>{
      this.captureDataUrl= 'data:image/jpeg;base64,' + resultado;
      this.updateFirebase();
    }).catch(error=>{
      console.log(error);
    })
  } 

  //funcion para seleccionar imagen del celular
  goToSeleccionar(sourceType){
      const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };

   this.camera.getPicture(cameraOptions)
    .then((captureDataUrl) => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl; 
      this.updateFirebase();
    }, (err) => {
        console.log(err);
    });
  } 
    
  //funcion para subir la imagen a firestore
  updateFirebase(){
    if(this.captureDataUrl!="assets/imgs/nimg.jpg"){
      let loading = this.loadingCtrl.create({
        content: 'Cargando Imagen. Por favor, espere...'
      });
      loading.present();
      this.shareImagen=this.captureDataUrl;
      this.productof.uploadImagen(this.captureDataUrl)
      .then(photoURL => {
        this.captureDataUrl=photoURL;
        loading.dismiss();
      });
    }
  }

   //funcion para crear producto
  goToCrearProducto({value}:{value:Productos}){ 
    value.image=this.captureDataUrl;
    value.idImagen=this.shareImagen;
    value.precioTransformado=this.precioTrans;
    value.precioVenta=this.precioReal;
    this.productof.addNewProducto(value);
    this.numeroProductos=this.numeroProductos+1;
    this.dashboardf.updateUsuarioContadorProductos(this.numeroProductos);
    this.navCtrl.setRoot(ProductosPage);
  }

}
