import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { Clientes } from '../../models/clientes';
import ClientesPage from '../clientes/clientes';
import { Dashboard } from '../../models/dashboard';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { VentasProvider } from '../../providers/ventas/ventas';
import { Ventas } from '../../models/ventas';
import { FormaPago } from '../../models/formaPago';

/**
 * Generated class for the EditarClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-cliente',
  templateUrl: 'editar-cliente.html',
})
export class EditarClientePage implements OnInit{
  idCliente:string;
  cliente: Clientes = {  
    id:'',
    nombres:'',
    direccion: '',
    telefono:'',
    email:'',
    observaciones:'',
    adeuda:'',
    fechaCobro:'',
    abonoCobrar:'',
    numeroPagos:'',
    modalidadC:'',
    numeroVentas:'',
    totalVendido:'',
    totalCobrado:'',
    saldoFavorC:0,
    estadoCliente:true,
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
    numeroClientes:number;
  numeroPa: number;
  numeroVen: number;
  totalVen: any;
  totalCo: any;
  numeroCobros: number;
  numeroVentas: number;
  sumaVentas: string;
  sumaCobrado: string;
  ventas:Ventas[];
  estado: boolean;
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
  estadoFormaPago: boolean;
  idFormaPago:string;
  saldoactual: any;
  saldoFavorC: any;
  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,private ventaf:VentasProvider,public dashboardf: DashboardProvider,public navParams: NavParams, private clientef: ClientesProvider) {
    this.idCliente = navParams.get("idCliente");
  }
    ngOnInit(){
      this.getDetallesClientes();
      this.obtenerVentas();
     
    }

    //funcion para comprobar si existe forma de pago
  cargarFormaPago(){
    this.ventaf.getFormaPago(this.idCliente).subscribe(formaPagos=>{
      this.formaPagos=formaPagos; 
      if(this.formaPagos){
        for(var i=0;i<formaPagos.length;i++){
          this.formaPago=formaPagos[i];
          this.idFormaPago=this.formaPago.id;
          this.estadoFormaPago=true;
        } 
      } else{
        this.estadoFormaPago=false;
      }    
    }); 
  }
    //funcion para saber si existen ventas
    obtenerVentas(){
      this.ventaf.getAnteriorVenta(this.idCliente).subscribe(ventas=>{
        this.ventas=ventas;
       if(ventas.length==0){
        this.estado=false;
       }else{
         this.estado=true;
       }
      });
    }
    
    //funcion para obtener datos de cliente
    getDetallesClientes(){
      this.clientef.getOneCliente(this.idCliente).subscribe(cliente=> {
        this.cliente=cliente
        if(cliente!=null){
        this.numeroPa=cliente.numeroPagos;
        this.numeroVen=cliente.numeroVentas;
        this.totalVen=cliente.totalVendido;
        this.totalCo=cliente.totalCobrado;
        this.saldoactual=cliente.adeuda;
        this.saldoFavorC=cliente.saldoFavorC;
        }
      });
    }

   //funcion para modificar un cliente
    modificarCliente({value}:{value:Clientes}){
      value.id=this.idCliente; 
      this.clientef.updateCliente(value);//envio todo los parametros de cliente para actualizar
      this.navCtrl.pop();
    }

    //Funcion para eliminar un cliente
    goToEliminarCliente(cliente){
      if(this.saldoFavorC=='0'|| this.saldoFavorC=='0.00'){
        if(this.saldoactual=='0'|| this.saldoactual=='0.00'){
          this.cargarFormaPago();
          this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
            this.dashboard=dashboard;
            this.numeroClientes=this.dashboard.contadorClientes;
            this.numeroCobros=this.dashboard.contadorCobros;
            this.numeroVentas=this.dashboard.contadorVentas;
            this.sumaVentas=this.dashboard.totalVendido;
            this.sumaCobrado=this.dashboard.totalCobrado;
          });
          let alert = this.alertCtrl.create({
          title: '¿Confirmar eliminación?',
          message: 'Se eliminará toda la información relacionada con el cliente',
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
                    this.numeroClientes=this.numeroClientes-1;
                    this.eliminarDatosCliente(cliente);
                    
                }
            }
          ]
        });
        alert.present();
        }else{
          let alert = this.alertCtrl.create({
            title: '',
            message: 'No se puede eliminar este cliente, aún tiene deuda pendiente.',
            buttons: ['OK']
            });
            alert.present();
        }
      }else{
        let alert = this.alertCtrl.create({
          title: '',
          message: 'No se puede eliminar este cliente, aún tiene saldo a favor.',
          buttons: ['OK']
          });
          alert.present();
      }
    }  
  //funcion para eliminar datos del cliente en el dashboard
  eliminarDatosCliente(cliente:any){
    let numeroTV:number=0;
    let numeroTC:number=0;
    let res2:any;
    let res3:any;
    numeroTV=this.numeroVentas-this.numeroVen;
    console.log(numeroTV+'tv');
    console.log(this.numeroVentas+'tv');
    console.log(this.numeroVen+'tv');
    numeroTC=this.numeroCobros-this.numeroPa;
    console.log(numeroTC+'tc');
    console.log(this.numeroCobros+'tv');
    console.log(this.numeroPa+'tv');
    if(!this.totalVen){
      this.totalVen=0;
    }
    if(!this.totalCo){
      this.totalCo=0;
    }
    let strE:string='';
      strE= this.sumaVentas;
      var re= /,/gi;
      if(strE && strE.length>4){
        strE = strE.replace(re,"");
      }
    let SV=parseFloat(strE);

    let strV:string='';
      strV= this.totalVen;
      var re= /,/gi;
      if(strV && strV.length>4){
        strV = strV.replace(re,"");
      }
    let SVe=parseFloat(strV);
    let totalV=SV-SVe;
    console.log(totalV+'toya');
  
    res2=totalV.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.sumaVentas=res2+'';
    console.log(this.sumaVentas+'tventas');
  /////
    let strC:string='';
      strC= this.sumaCobrado;
      var re= /,/gi;
      if(strC && strC.length>4){
        strC = strC.replace(re,"");
      }
    let SC=parseFloat(strC);

    let strCo:string='';
    strCo= this.totalCo;
      var re= /,/gi;
      if(strCo && strCo.length>4){
        strCo = strCo.replace(re,"");
      }
    let SCO=parseFloat(strCo);
    let totalC=SC-SCO;
    console.log(totalC+'toya');
    res3=totalC.toLocaleString('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.sumaCobrado=res3+'';
    console.log(this.sumaCobrado+'tcobtya');
    this.dashboardf.updateUsuarioContadorClientes(this.numeroClientes,numeroTV,numeroTC,this.sumaVentas,this.sumaCobrado);
    if(this.estado==true){
      this.ventaf.deleteVentas(this.idCliente);
    }
    if(this.estadoFormaPago==true){
      this.ventaf.deleteFormaPago(this.idCliente, this.idFormaPago);
    }
    this.clientef.updateClienteborrado(this.idCliente);
    this.navCtrl.setRoot(ClientesPage);
  }
  
}
