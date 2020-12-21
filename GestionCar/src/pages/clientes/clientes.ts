import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import RegistroClientesPage from '../registro-clientes/registro-clientes';
import { AuthProvider } from '../../providers/auth/auth';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { Clientes } from '../../models/clientes';
import { Ventas} from '../../models/ventas';
import {DetallesClientesPage} from '../detalles-clientes/detalles-clientes';
import { VentasProvider } from '../../providers/ventas/ventas';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { LocalNotifications } from '@ionic-native/local-notifications';


/**
 * Generated class for the ClientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
  
})
export default class ClientesPage implements OnInit {
  clientes:Clientes[];//propiedad para recuperar todos los clientes deja consultar ya
  listaClientes:Clientes[];

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

   ventas: Ventas = {  
    id:'',
    titulo:'',
    nombreProducto:'',
    fechaCompra:'',
    saldoActual:'',
    precio:'',
    anticipo:0,
    total:0,
    cantidadPagos:'',
    fechaPP:'', //fecha proximo pago 
    observaciones:'',
    pago:'',
   } 
   u:string;
   numeroPagina:any='1';
  fecha: any;
  estado:number=1;
  fechaActual: string;
  dias: number;
  f: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authf:AuthProvider,
    private clientef:ClientesProvider,public alertCtrl: AlertController,private ventaf:VentasProvider, private localNotifications: LocalNotifications) {
      this.numeroPagina = navParams.get("np");
      this.fecha = navParams.get("fe");
    }

  ngOnInit(){ //se ejecuta cada vez que el componente inicia su carga
    this.getFechaActual();
    this.allClientes(); 
    
    //this.u=firebase.auth().currentUser.uid  
  }

  //funcion para obtener fecha actual
  getFechaActual() {
    let mes:any;
    let dia:any;
    let anio:any;
    let fechaActual:any;
    fechaActual=new Date();
    anio=fechaActual.getFullYear();
    mes=parseInt(fechaActual.getMonth())+ 1 ;
    dia=fechaActual.getDate();
   // this.fe=Date.parse(this.fecha);
    if (mes < 10) { 
     mes = "0" + mes
    } 
    if (dia < 10) { 
        dia  = "0" + dia  
    }
    this.fechaActual=anio+"-"+mes+"-"+dia;
    console.log('fechaActual'+this.fecha);
  }


  //funcion para obtener todos los clientes
  allClientes(){
    if(this.numeroPagina){
      if(this.numeroPagina=='1'){
        this.clientef.getAllClientesCuentasCobrar().subscribe(clientesCobrar=>{
          this.clientes=clientesCobrar;
          this.listaClientes=this.clientes;      
        });
      }
      if(this.numeroPagina=='2'){
        this.clientef.getAllClientesCuentasCorriente().subscribe(clientesCorriente=>{
          this.clientes=clientesCorriente;
          this.listaClientes=this.clientes;
        });
      }
      if(this.numeroPagina=='3'){
        this.estado=2;
        this.clientef.getAllClientesCuentasProximas(this.fecha).subscribe(clientesProxima=>{
          this.clientes=clientesProxima;
          this.listaClientes=this.clientes;
        });
      }
      if(this.numeroPagina=='4'){
        this.estado=2;
        this.clientef.getAllClientesCuentasPorVencer(this.fecha).subscribe(clientesPorVencer=>{
          this.clientes=clientesPorVencer;
          this.listaClientes=this.clientes;
        });
      }
      if(this.numeroPagina=='5'){
        this.estado=2;
        this.clientef.getAllClientesCuentasVencidas(this.fecha).subscribe(clientesVencidas=>{
          this.clientes=clientesVencidas;
          this.listaClientes=this.clientes;
        });
      }
    }else
     {
      this.clientef.getAllClientes().subscribe(clientes=>{
        this.clientes=clientes;
        this.listaClientes=this.clientes;
        /*for(var i=0; i<clientes.length;i++){
          let fecha=this.clientes[i];
          if(fecha.fechaCobro){
          let fechas=fecha.fechaCobro;
            if(fechas<this.fechaActual){
            let fecha1 = new Date(fechas);
            let fecha2 = new Date(this.fechaActual);
            let resta = fecha2.getTime() - fecha1.getTime()
            this.dias=Math.round(resta/ (1000*60*60*24));
            this.f=fechas;
            console.log(Math.round(resta/ (1000*60*60*24)));
            
            console.log(this.dias+'dias');
            }
          }
        }*/
      });
    }
  }
 
  
  //funcion que redirige a la Pagina de Registro de Clientes
  goToRegistroDeCliente(){
    this.navCtrl.push(RegistroClientesPage);
  }

  //funcion  que redirige a la Pagina Detallescliente
  detalleCliente(idCliente:string){
    this.navCtrl.push(DetallesClientesPage,{ idCliente});
  }

  //funcion para obtener la lista de clientes
  initiliazeItems():void{
    this.listaClientes=this.clientes;
  }

  //funcion para buscar cliente en la lista 
  getItems(ev:any){
    this.initiliazeItems();
    let val=ev.target.value;
    if(val && val.trim() !=''){
      this.listaClientes=this.listaClientes.filter((cliente)=>{
        return (cliente.nombres.toLowerCase().indexOf(val.toLowerCase()) >-1);
      })
    }
  }
}

