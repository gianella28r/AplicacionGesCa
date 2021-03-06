import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clientes } from '../../models/clientes';
import { Ventas } from '../../models/ventas';
import { VentasProvider } from '../../providers/ventas/ventas';
import { FormaPago } from '../../models/formaPago';
/**
 * Generated class for the EnviarDatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


 
@IonicPage()
@Component({
  selector: 'page-enviar-datos',
  templateUrl: 'enviar-datos.html',
})
export class EnviarDatosPage implements OnInit {
  //plantillas:Plantillas[];
  idNumero:any;
  idCorreo:any;
  idNombres:any;
  idAdeuda:any;

  mensaje:string="";
  image: string; 
  imageForSharing: string;
  
  
  cuenta: Clientes = {  
    id:'',
    nombres:'',
    direccion: '',
    telefono:'',
    email:'',
    observaciones:'',
    adeuda:0,
    fechaCobro:'',
    saldoFavorC:0,
    estadoCliente:true,
  } 
  venta: Ventas = {  
   id:'',
   titulo:'',
   nombreProducto:'',
   fechaCompra:'',
   saldoActual:'',
   precio:'',
   anticipo:'',
   total:0,
   cantidadPagos:'',
   fechaPP:'', //fecha proximo pago 
   observaciones:'',
   pago:'',
   clienId:'',
   cantidad:1,
   subTotal:'',
   saldoFavor:0,
   estadoTransaccion:true,
  }

  radio_list= {
      id: '1',
      name: 'group1',
      value: 'radio_1',
      titulo: 'Cuenta',
      texto: 'Hola Estimad@',
      disabled: false,
      checked: false,
      color: 'primary'
  }

  radioL= {
      id: '1',
      name: 'group1',
      value: 'radio_1',
      titulo: 'Ultima Transacción',
      texto: '***Transacción***',
      disabled: false,
      checked: false,
      color: 'primary'
  }

  radio3= {
    id: '1',
    name: 'group1',
    value: 'radio_1',
    titulo: 'Forma de Pago',
    texto: '***Forma de Pago***',
    disabled: false,
    checked: false,
    color: 'primary'
}


  formaP:FormaPago={
    id:'',
    pagoAcordado:'',
    proximaFechaPago:'',
    modalidadCobro:'',
    clienNombre:'',
    clienId:'',  
    adeuda:'',
    advertencia:0,
    mensaje:'',
    mensajeFormaPago:'',
  }
  idCliente:string;
  formaPagos:FormaPago[];
  idFinal: string;
  mensajeFormaPago: string;
  mensajeF:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private ventaf:VentasProvider, alert:AlertController,private alertCtrl: AlertController,
    private socialSharing: SocialSharing) {
    this.cuenta = navParams.get("cliente");
    this.idNombres=this.cuenta.nombres;
    this.idNumero=this.cuenta.telefono;
    this.idCorreo=this.cuenta.email;
    this.idAdeuda=this.cuenta.adeuda;
    this.idCliente=this.cuenta.id;
    this.venta = navParams.get("venta");
    console.log('numerotelefono'+this.idNumero);
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EnviarDatosPage');
  }

  ngOnInit(){ //se ejecuta cada vez que el componente inicia su carga
    this.cargarFormaPago();  
    this.capturarItemLocal(this.radio_list.texto);
  }

  //funcion para guardar el mensaje seleccionado
  capturarItemLocal(value){
    console.log('valueenviar'+ value);
    this.mensaje=value;
    this.mensaje=this.mensaje+' '+this.idNombres+'\n'+'Usted actualmente adeuda $'+this.idAdeuda;
     console.log('valuemensaje'+this.mensaje);
    // alert('valuemensaje'+this.mensaje);
  }

  capturarItemLocal2(value){
    console.log('valueenviar'+ value);
    this.mensaje=value;
    let fecha1=this.venta.fechaCompra;
    var fecha = new Date(fecha1);
    let fechaT=fecha.toLocaleDateString();
    if(this.venta.titulo=="Venta Credito"){
      this.mensaje=this.mensaje+'\n'+'Hola Estimad@ '+this.idNombres+'\n'+'A continuación se detalla la última transacción realizada:'+'\n'+'Transacción: '+this.venta.titulo+'\n'+'Realizada: '+fechaT+'\n'+'Producto Comprado: '+this.venta.nombreProducto+'\n'+'Número de productos Comprados: '+this.venta.cantidad+'\n'+'Precio de Venta: '+this.venta.precio+'\n'
      +'Total: '+this.venta.subTotal+'\n'+'Saldo a favor: '+this.venta.saldoFavor+'\n'+'Anticipo: '+this.venta.anticipo+'\n'+'Adeuda: '+this.venta.total;
    }

    if(this.venta.titulo=="Venta Contado"){
      this.mensaje=this.mensaje+'\n'+'Hola Estimad@ : '+this.idNombres+'\n'+'A continuación se detalla la última transacción realizada:'+'\n'+'Transacción: '+this.venta.titulo+'\n'+'Realizada: '+fechaT+'\n'+'Producto Comprado: '+this.venta.nombreProducto+'\n'+'Número de productos Comprados: '+this.venta.cantidad+'\n'+'Precio de Venta: '+this.venta.precio+'\n'
     +'SubTotal:'+this.venta.subTotal+'\n'+'Saldo a favor: '+this.venta.saldoFavor+'\n'+'Total Pagado: '+this.venta.pago+'\n'+'Adeuda: '+this.venta.total;
    }

    if(this.venta.titulo=="Pago"){
      this.mensaje=this.mensaje+'\n'+'Hola Estimad@: '+this.idNombres+'\n'+'A continuación se detalla la última transacción realizada:'+'\n'+'Transacción: '+this.venta.titulo+'\n'+'Realizada: '+fechaT+'\n'+'Saldo a favor: '+this.venta.saldoFavor+'\n'+'Monto Pagado: '+this.venta.pago+'\n'+'Adeuda: '+this.venta.total;;
    }
    
     console.log('valuemensaje'+this.mensaje);
    // alert('valuemensaje'+this.mensaje);
  }

  capturarItemLocal3(value){
    this.mensaje='';
    this.mensaje=value;
    this.mensaje=this.mensaje+'\n'+'Hola Estimad@ : '+this.idNombres+'\n'+'Actualmente se ha establecido la siguiente forma de Pago.'+'\n'+this.mensajeFormaPago;
     console.log('valuemensaje'+this.mensaje);
    // alert('valuemensaje'+this.mensaje);
  }

  capturarItem(value){
    console.log('valueenviar'+ value);
    this.mensaje=value;
     console.log('valuemensaje'+this.mensaje);
    // alert('valuemensaje'+this.mensaje);
  }

  cargarFormaPago(){
    this.ventaf.getFormaPago(this.idCliente).subscribe(formaPagos=>{
      this.formaPagos=formaPagos;
      if(formaPagos.length==1){
        for(var i=0;i<formaPagos.length; i++){
          this.formaP=this.formaPagos[i];
          this.mensajeFormaPago=this.formaP.mensajeFormaPago;
          console.info(this.formaP.mensajeFormaPago+'forma');
         }
      }
      if(formaPagos.length==0){
        this.mensajeFormaPago='';
      }
    }); 
  }
  
  goToEnviarEmail(){
    this.socialSharing.canShareViaEmail().then(() => {
      this.socialSharing.shareViaEmail(this.mensaje, null, [this.idCorreo]).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });
  }
 
  goToEnviarWhatsapp(){
    if(this.idNumero!=null && this.idNumero!="" ){
    let numero='593';
    numero=numero+this.idNumero;
    console.log(this.idNumero+'numero');
    this.socialSharing.shareViaWhatsAppToReceiver(numero, this.mensaje, null, null).then(() => {
          // Success!
    }).catch(() => {
          // Error!
    });}
    else{
      let alert = this.alertCtrl.create({
        title: '',
        message: 'No se puede realizar esta acción. Por favor añada un número de teléfono a Cliente.',
        buttons: ['OK']
        });
        alert.present();
    }
  }

  goToEnviarSms(){
    this.socialSharing.shareViaSMS(this.mensaje, this.idNumero).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
  // Sharing via email is possible
  }

  goToEnviarShare(){
    this.socialSharing.share(this.mensaje, null, null, null).then(() => {
        // Success!
      }).catch(() => {
        // Error!
    });
  // Sharing via email is possible
  }
}
