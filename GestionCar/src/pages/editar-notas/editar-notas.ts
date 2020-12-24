import { Component,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { NotasProvider } from '../../providers/notas/notas';
import { Notas } from '../../models/notas';
import { ProductosProvider } from '../../providers/productos/productos';
import { Camera, CameraOptions} from '@ionic-native/camera';

/**
 * Generated class for the EditarNotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-notas',
  templateUrl: 'editar-notas.html',
})
export class EditarNotasPage  implements OnInit{
idNota:any;
captureDataUrl: string;
captureData: string;
nota: Notas = {  
    id:'',
    titulo:'',
    descripcion:'',
    fechaPublicacion:'',
    fechaAviso:'',
    clienNombre:'',
    clienId:'',
    imagenNota:'',
    estadoNota:true,
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private notaf:NotasProvider,
    private loadingCtrl: LoadingController,
    private productof: ProductosProvider,
    private camera:Camera) {
    this.idNota = navParams.get("idNota");
  }
  ngOnInit(){
      this.getDetallesNotas();
  }
  
  //funcion para obtener detalle de Nota
  getDetallesNotas(){
    this.notaf.getOneNota(this.idNota).subscribe(nota=>{
      this.nota=nota;
      this.captureDataUrl=nota.imagenNota;
      this.captureData=this.captureDataUrl;
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
// Función para guardar la url de imagen en Producto en cloud Firestore
  updateFirebase(){
    if(this.captureDataUrl!=this.captureData){
      let loading = this.loadingCtrl.create({
        content: 'Cargando Imagen. Por favor, espere...'
      });
      loading.present();
      this.productof.uploadImagen(this.captureDataUrl)
      .then(photoURL => {
        this.captureDataUrl = photoURL;
        loading.dismiss();
      }); 
      this.productof.deleteImagen(this.captureData);
    }
  }

  //funcion para actualizar nota
  modificarNota({value}:{value:Notas}){
      value.id=this.idNota;
      value.imagenNota=this.captureDataUrl;
      this.notaf.updateNota(value);//envio todo los parametros de cliente para actualizar
      this.navCtrl.pop();
  }
}
