import { Component,   OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Clientes } from '../../models/clientes';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { AuthProvider } from '../../providers/auth/auth';
import ClientesPage from '../clientes/clientes';
import { Dashboard } from '../../models/dashboard';
import { DashboardProvider } from '../../providers/dashboard/dashboard';


/**
 * Generated class for the RegistroClientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-registro-clientes',
  templateUrl: 'registro-clientes.html',
})
export default class RegistroClientesPage implements OnInit{
  clientes: Clientes = {  
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
    orden:0,
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
  constructor(private authf : AuthProvider, public navCtrl: NavController, public dashboardf: DashboardProvider, public navParams: NavParams,private clientef: ClientesProvider,  private loadingCtrl: LoadingController) 
  {
  }
  
  ngOnInit(){
    this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.numeroClientes=this.dashboard.contadorClientes;
    });
  } 

  //funcion para crear cliente
  goToCrearCliente({value}:{value:Clientes}){
    value.adeuda=0;
    value.fechaCobro='';
    value.abonoCobrar='';
    value.numeroPagos=0;
    value.modalidadC='';
    value.numeroVentas=0;
    value.totalVendido='';
    value.totalCobrado='';
    value.orden=0;
    this.numeroClientes=this.numeroClientes+1;
    this.dashboardf.updateUsuarioContadorCliente(this.numeroClientes);
    this.authf.getAuth().subscribe(user=>{
      this.clientef.addNewCliente(value);
    });
    this.navCtrl.setRoot(ClientesPage);
    
  }
}

