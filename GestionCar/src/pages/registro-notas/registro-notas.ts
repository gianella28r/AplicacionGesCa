import { Component,  OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Notas } from '../../models/notas';
import { Clientes } from '../../models/clientes';
import { NotasProvider } from '../../providers/notas/notas';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { ProductosProvider } from '../../providers/productos/productos';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Dashboard } from '../../models/dashboard';
/**
 * Generated class for the RegistroNotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-notas',
  templateUrl: 'registro-notas.html',
})
export class RegistroNotasPage implements OnInit{
  idCliente:any;
  captureDataUrl: string;
  cliente: Clientes = {  
    id:'',
    nombres:'',
  } 

  notas: Notas = {  
    id:'',
    titulo:'',
    descripcion:'',
    fechaPublicacion:'',
    fechaAviso:'',
    clienNombre:'',
    clienId:'',
    imagenNota:'',
  } 

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
  numeroNotas: number;
  

  constructor(private clientef : ClientesProvider, public dashboardf: DashboardProvider,public navCtrl: NavController, public navParams: NavParams,private notaf: NotasProvider, 
   private loadingCtrl: LoadingController,
   private productof: ProductosProvider,
   private camera:Camera) 
  {
    this.idCliente = navParams.get("id");
  }
  
  ngOnInit(){
    this.captureDataUrl='';
    this.detalleUsuarioDashboard(); 
  }

  //funcion para obtener datos del Dashboard
  detalleUsuarioDashboard(){
    this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.numeroNotas=this.dashboard.contadorNotas;
    });
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

  //funcion para subir la imagen a firestore
  updateFirebase(){
    if(this.captureDataUrl!=''){
      let loading = this.loadingCtrl.create({
        content: 'Cargando Imagen. Por favor, espere...'
    });
      loading.present();
      this.productof.uploadImagen(this.captureDataUrl)
      .then(photoURL => {
        this.captureDataUrl=photoURL;
        loading.dismiss();
      });
    }
  }

  //funcion para crear nota
  goToCrearNota({value}:{value:Notas}){
    value.fechaPublicacion=(new Date()).getTime();
    this.numeroNotas=this.numeroNotas+1;
    this.dashboardf.updateUsuarioContadorNotas(this.numeroNotas);
    this.clientef.getOneCliente(this.idCliente).subscribe(cliente=>{
      this.cliente=cliente;
      value.clienId=this.cliente.id;
      value.clienNombre=this.cliente.nombres;
      value.imagenNota=this.captureDataUrl;
      value.estadoNota=true;
      this.notaf.addNewNota(value);
    });
    this.navCtrl.pop();

  }

}
