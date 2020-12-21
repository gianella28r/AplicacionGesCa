import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { VentasProvider } from '../../providers/ventas/ventas';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { Clientes } from '../../models/clientes';
import { Ventas } from '../../models/ventas';
import { VentaCreditoPage } from '../venta-credito/venta-credito';
import {PagoPage} from '../pago/pago';
import { VentaContadoPage } from '../venta-contado/venta-contado';
import { EnviarDatosPage } from '../enviar-datos/enviar-datos';
import { NotasPage } from '../notas/notas';
import { ReagendarPage } from '../reagendar/reagendar';
import { AgendarPage } from '../agendar/agendar';
import { CallNumber } from '@ionic-native/call-number';
import { FormaPago } from '../../models/formaPago';
import { EditarClientePage } from '../editar-cliente/editar-cliente';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Dashboard } from '../../models/dashboard';
import { DashboardProvider } from '../../providers/dashboard/dashboard';


/**
 * Generated class for the DetallesClientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalles-clientes',
  templateUrl: 'detalles-clientes.html',
})
export class DetallesClientesPage implements OnInit {
  numero:string='';
  adeuda:string='';

  ventas:Ventas[];
  i:number;
  idCliente:any;
  idCuenta:any;
  idVentaU:any;
  id:any;//guardo el idcliente para enviarlo 
  idVentaTotal:any;
  cliente: Clientes = {  
    id:'',
    nombres:'',
    direccion: '',
    telefono:'',
    email:'',
    observaciones:'',
    adeuda:0,
    fechaCobro:'',
    abonoCobrar:'',
    numeroPagos:'',
    modalidadC:'',
    numeroVentas:'',
    totalVendido:'',
    totalCobrado:'',
  } 
  ventass:Ventas[];
  formaPagos:FormaPago[];
  formaPago:FormaPago={
    id:'',
    pagoAcordado:'',
    proximaFechaPago:'',
    modalidadCobro:'',
    clienNombre:'',
    clienId:'',  
    adeuda:'',
    advertencia:0,
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
  }
  
  idFinal:string='';

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

  numeroVentas:number;
  numeroCobros:number;
  sumaVentas:any='';
  sumaCobrado:any='';
  totalVentas:any='';
  totalCobrado:any='';
  ventaS: any;

  clienteCobro: Clientes = {  
    id:'',
    nombres:'',
    direccion: '',
    telefono:'',
    email:'',
    observaciones:'',
    adeuda:0,
    fechaCobro:'',
    abonoCobrar:'',
    numeroPagos:'',
    modalidadC:'',
    numeroVentas:'',
    totalVendido:'',
    totalCobrado:'',
  }
  modalidadCo: any;
  numeroVen: any;
  totalVen: any;
  totalCo: any;
  numeroPa:any;
 
  constructor(public navCtrl: NavController, private navParams: NavParams, 
    private clientef: ClientesProvider, public usuariof: UsuarioProvider,
    public alertCtrl:AlertController,public dashboardf: DashboardProvider,private ventaf:VentasProvider, private callNumber: CallNumber,
    ) {
 //recibir parametros enviados
    this.idCliente = navParams.get("idCliente");
  }

  ngOnInit(){
    this.getDetallesClientes();
    this.allVentas();
    this.obtenerSaldoActual();
    this.cargarFormaPago()
    //this.modificarCliente();
    this.detalleUsuarioDashboard();
  }

 //funcion para obtener datos del Dashboard
 detalleUsuarioDashboard(){
  this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
    this.dashboard=dashboard;
    this.numeroVentas=this.dashboard.contadorVentas;
    this.numeroCobros=this.dashboard.contadorCobros;
    this.sumaVentas=this.dashboard.totalVendido;
    this.sumaCobrado=this.dashboard.totalCobrado;
    
  });
}

  //funcion para obtener datos del Cliente
  getDetallesClientes(){
    this.clientef.getOneCliente(this.idCliente).subscribe(cliente=>{
      this.cliente=cliente;
      if(cliente!=null){
        this.numero=this.cliente.telefono;
        this.numeroPa=cliente.numeroPagos;
        this.modalidadCo=cliente.modalidadC;
        this.numeroVen=cliente.numeroVentas;
        this.totalVen=cliente.totalVendido;
        this.totalCo=cliente.totalCobrado;
      }
      
    });    
  }
  //funcion para realizar llamada
  goToLLamar(){
    if(this.numero!=null){
      this.callNumber.callNumber(this.numero, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'No se puede realizar la llamada',
        message: 'El cliente no cuenta con numero de teléfono',
        buttons: ['OK']
     });
     alert.present();
    }
    
  } 
  //funcion para ir a la pagina de Notas
  goToNotas(){
    this.navCtrl.push(NotasPage,{id:this.idCliente});
  }

  //funcion para recuperar todas las ventas de un cliente
  allVentas(){
    this.ventaf.getAllVentas(this.idCliente).subscribe(ventas=>this.ventas=ventas);
   
  }

  //funcion para registrar Ventas
  goToRegistroVentas(){
    let alert = this.alertCtrl.create({
      title: 'Ventas',
      message: '¿Que tipo de venta desear registrar?',
      buttons: [
        {
          text: 'Venta a Crédito',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
            this.navCtrl.push(VentaCreditoPage,{id:this.idCliente});
          }
        },
        {
          text: 'Venta a Contado',
          handler: () => {
               // AquÍ borramos el sitio en la base de datos
            this.navCtrl.push(VentaContadoPage,{id:this.idCliente});

          }
        },
        {
          text: 'Nada por ahora',
          role: 'Cancel',
          handler: data => {
          console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present(); 
  }
  //funcion para ir a la pagina Pago
  goToRegistroPagoCliente(){
    this.navCtrl.push(PagoPage,{id:this.idCliente});
  }
  
  //funcion para obtener el saldo actual que debe el cliente
  obtenerSaldoActual(){
    let orden:number;
    this.ventaf.getAnteriorVenta(this.idCliente).subscribe(ventass=>{
      this.ventass=ventass;
      for(var i=0;i<ventass.length; i++){
        this.venta=this.ventass[i];
        this.idFinal=this.venta.id; 
     }
     
      if(this.cliente){
        if(ventass.length==1){
         let strE=this.venta.total;
          var re= /,/gi;
          if(strE && strE.length>4){
            strE = strE.replace(re,"");
          }
          let orden=parseFloat(strE);
          this.clientef.updateClienteVenta(this.idCliente,this.venta.total,orden);
        }

        if(ventass.length==0){
          this.venta.total=0;
          orden=0;
          this.clientef.updateClienteVenta(this.idCliente,this.venta.total,orden);
        }
      }
    });
  }

  //funcion para actualizar datos del cliente
  modificarCliente({value}:{value:Clientes}){
    value.id=this.idCliente;
    this.clientef.updateCliente(value);       
  }

  //funcion para ir a la Pagina Compartir
  goToEnviarDatosVentas(){
   this.navCtrl.push(EnviarDatosPage,{cliente:this.cliente, venta:this.venta});
  }

  //funcion para cargar forma de pago
  cargarFormaPago(){
    this.ventaf.getFormaPago(this.idCliente).subscribe(formaPagos=>{
      this.formaPagos=formaPagos;      
    }); 
  }

  //funcion para ir a la pagina de agendar pago
  goToReagendar(){
    if(this.formaPagos.length==1){
      this.navCtrl.push(ReagendarPage,{id:this.idCliente, idVentaTotal:this.venta.total});
    }else{
      this.navCtrl.push(AgendarPage,{id:this.idCliente, idVentaTotal:this.venta.total});
    }
  }

  //funcion para actualizar Datos del Dashboard
  actualizarDatosDashboardPago(pago:any){
    let res2:any;
    let tCobros:any;
    let ventas:any;
    let numeroCobros:number=0;
    let sumaCobrado:any;
    tCobros=this.sumaCobrado;
  
    let strC:string='';
    strC= pago;
  //primer paso: fuera puntos
    var re= /,/gi;
    if(strC && strC.length>3){
      strC = strC.replace(re,"");
    }
    let totCO=parseFloat(strC);
     ventas=totCO;
     
    //suma de cobros
      let strE:string='';
      strE= tCobros;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strE && strE.length>3){
        strE = strE.replace(re,"");
      }
      let totC=parseFloat(strE);
      let totalC=totC-ventas;
      res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      sumaCobrado=res2+'';
     
      numeroCobros=this.numeroCobros-1;
     
      this.dashboardf.updateUsuarioTotalCobros(numeroCobros,sumaCobrado);
      
  }

  //funcion para actualizar Datos del Dashboard
  actualizarDatosDashboardVentas(pagoV:any,pagoA:any){
    let res2:any;
    let res1:any;
    let tVentas:any;
    let tCobros:any;
    let ventas:any;
    let numeroVentas:number=0;
    let numeroCobros:number=0;
    let sumaCobrado:any;
    let sumaVentas:any;
    tVentas=this.sumaVentas;
    tCobros=this.sumaCobrado;
    
     let v=pagoV;
     let str:string='';
      str= v;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(str && str.length>3){
        str = str.replace(re,"");
      }
      ventas=parseFloat(str);
     console.log(ventas+'ventas2');
      let strEx:string='';
      strEx = tVentas;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strEx && strEx.length>3){
        strEx = strEx.replace(re,"");
      }
      let tot=parseFloat(strEx);
      let totalV=tot-ventas;
      res1=totalV.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      sumaVentas=res1+'';
      numeroVentas=this.numeroVentas-1;
    //suma de cobros
      let c=pagoA;
     let strC:string='';
      strC= c;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strC && strC.length>3){
        strC = strC.replace(re,"");
      }
      let cobro=parseFloat(strC);
     console.log(cobro+'cobro');
      let strE:string='';
      strE= tCobros;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strE && strE.length>3){
        strE = strE.replace(re,"");
      }
      let totC=parseFloat(strE);
      let totalC=totC-cobro;
      res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      sumaCobrado=res2+'';
      numeroCobros=this.numeroCobros-1;
      this.dashboardf.updateUsuarioTotalVentas(numeroVentas,numeroCobros,sumaVentas,sumaCobrado);
  }


   //funcion para actualizar Datos del Cliente
   actualizarDatosClientesPago(pago:any){
    let res2:any;
    let tCobros:any;
    let ventas:any;
    let numeroCobros:number=0;
    let sumaCobrado:any;
    tCobros=this.totalCo;
  
    let strC:string='';
    strC= pago;
  //primer paso: fuera puntos
    var re= /,/gi;
    if(strC && strC.length>3){
      strC = strC.replace(re,"");
    }
    let totCO=parseFloat(strC);
     ventas=totCO;
     
    //suma de cobros
      let strE:string='';
      strE= tCobros;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strE && strE.length>3){
        strE = strE.replace(re,"");
      }
      let totC=parseFloat(strE);
      let totalC=totC-ventas;
      res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      sumaCobrado=res2+'';
      numeroCobros=this.numeroPa-1;
      this.clientef.updateClienteTotalCobros(this.idCliente,numeroCobros,sumaCobrado);
      
  }

  //funcion para actualizar Datos del Dashboard
  actualizarDatosClientesVentas(pagoV:any,pagoA:any){
    let res2:any;
    let res1:any;
    let tVentas:any;
    let tCobros:any;
    let ventas:any;
    let numeroVentas:number=0;
    let numeroCobros:number=0;
    let sumaCobrado:any;
    let sumaVentas:any;
    tVentas=this.totalVen;
    tCobros=this.totalCo;
    
     let v=pagoV;
     let str:string='';
      str= v;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(str && str.length>3){
        str = str.replace(re,"");
      }
      ventas=parseFloat(str);
     console.log(ventas+'ventas2');
      let strEx:string='';
      strEx = tVentas;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strEx && strEx.length>3){
        strEx = strEx.replace(re,"");
      }
      let tot=parseFloat(strEx);
      let totalV=tot-ventas;
      res1=totalV.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      sumaVentas=res1+'';
      numeroVentas=this.numeroVen-1;
    //suma de cobros
      let c=pagoA;
     let strC:string='';
      strC= c;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strC && strC.length>3){
        strC = strC.replace(re,"");
      }
      let cobro=parseFloat(strC);
     console.log(cobro+'cobro');
      let strE:string='';
      strE= tCobros;
    //primer paso: fuera puntos
      var re= /,/gi;
      if(strE && strE.length>3){
        strE = strE.replace(re,"");
      }
      let totC=parseFloat(strE);
      let totalC=totC-cobro;
      res2=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      sumaCobrado=res2+'';
      numeroCobros=this.numeroPa-1;
      this.clientef.updateClienteDatosVenta(this.idCliente,numeroCobros,numeroVentas,sumaVentas,sumaCobrado);
  }


  

  //funcion para eliminar ultima venta
  eliminarVenta(venta){
    console.log(venta.titulo+'¿'+venta.pago+'pago'+venta.anticipo+'anticipo'+venta.subTotal);
    this.detalleUsuarioDashboard();
    let alert = this.alertCtrl.create({
     title: 'Confirmar borrado',
     message: '¿Estás seguro de que desea eliminar esta Nota?',
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
              console.log('1');
              if(venta.titulo=='Venta Contado'){
                this.actualizarDatosDashboardVentas(venta.pago,venta.pago);
                this.actualizarDatosClientesVentas(venta.pago,venta.pago);
                this.ventaf.deleteVenta(venta,this.idCliente); 
                this.obtenerSaldoActual(); 
              }else if(venta.titulo=='Venta Credito'){
                this.actualizarDatosDashboardVentas(venta.subTotal,venta.anticipo);
                this.actualizarDatosClientesVentas(venta.subTotal,venta.anticipo);
                this.ventaf.deleteVenta(venta,this.idCliente); 
                this.obtenerSaldoActual(); 
              }
              else if(venta.titulo=='Pago'){
                this.actualizarDatosDashboardPago(venta.pago);
                this.actualizarDatosClientesPago(venta.pago);
                this.ventaf.deleteVenta(venta,this.idCliente); 
                this.obtenerSaldoActual(); 
              } 
                         
              
          }
       }
     ]
   });
   alert.present();
 }



 //funcion que redirige a la pagina Editar Cliente
 goToEditarCliente(idCliente:string){
  this.navCtrl.push(EditarClientePage,{ idCliente});
 }

 
}
