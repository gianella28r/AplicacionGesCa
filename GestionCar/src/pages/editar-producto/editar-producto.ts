import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, AlertController} from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { Productos } from '../../models/productos';
import {ProductosPage} from '../productos/productos';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the EditarProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-producto',
  templateUrl: 'editar-producto.html',
})
export class EditarProductoPage implements OnInit  {
  idProducto:string;
  captureDataUrl: string;
  captureData: string;
  shareImagen:any;
  producto: Productos = {  
    id:'',
    nombre:'',
    precioVenta: '',
    precioTransformado:'',
    descripcion:'',
    image:'',
    idImagen:'',
    } 
  precioReal: any;
  precioTrans: string;
  descripcion: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private productof: ProductosProvider,private camera:Camera,
    private loadingCtrl: LoadingController,public alertCtrl: AlertController) {
    this.idProducto = navParams.get("idProducto");
  }

  ngOnInit(){
    this.getDetallesProductos();
  }
 
  //funcion para obtener datos de un producto
  getDetallesProductos(){
    this.productof.getOneProducto(this.idProducto).subscribe(producto=>{
      if(producto!=null){
        this.producto=producto;
        this.shareImagen=producto.idImagen;
        this.captureDataUrl=producto.image;
        this.captureData=this.captureDataUrl;
        this.precioTrans=this.producto.precioTransformado;
        this.descripcion=producto.descripcion;
      }
    });
  }

  //Funcion para dar formato al precio
  transformar(valor1: any) { 
    this.precioReal=valor1;
    let strEx;
    let res:any;
    strEx = parseFloat(this.precioReal);
    res= strEx.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.precioTrans=res+'';
  }

  //funcion para tomar fotos desde el celular
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

  //funcion para seleccionar una imagen del celular
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
// Función para guardar la url de imagen en Producto en cloud Firestore
  updateFirebase(){
    if(this.captureDataUrl!=this.captureData){
      let loading = this.loadingCtrl.create({
        content: 'Cargando Imagen. Por favor, espere...'
      });
      loading.present();
      this.shareImagen=this.captureDataUrl;
      this.productof.uploadImagen(this.captureDataUrl)
      .then(photoURL => {
        this.captureDataUrl = photoURL;
        loading.dismiss();
      }); 
      
    }
  }
  // Función para modificar los datos de Producto
  modificarProducto({value}:{value:Productos}){
    value.id=this.idProducto;
    value.idImagen=this.shareImagen;
    value.image=this.captureDataUrl;
    value.precioTransformado=this.precioTrans;
    this.productof.updateProducto(value);//envio todo los parametros de cliente para actualizar
    //this.productof.deleteImagen(this.captureData);
    this.navCtrl.setRoot(ProductosPage);
  }
}
