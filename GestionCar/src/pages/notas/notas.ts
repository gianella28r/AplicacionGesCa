import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController} from 'ionic-angular';
import {RegistroNotasPage} from '../registro-notas/registro-notas';
import { AuthProvider } from '../../providers/auth/auth';
import { NotasProvider } from '../../providers/notas/notas';
import { Notas } from '../../models/notas';
import {EditarNotasPage} from '../editar-notas/editar-notas';
import { ProductosProvider } from '../../providers/productos/productos';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Dashboard } from '../../models/dashboard';


/**
 * Generated class for the NotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage implements OnInit {
  notas:Notas[];//propiedad para recuperar todas las notas
  idCliente:any;
  id:any; 
  listaNotas:Notas[];
  fechaActual:any='';
  dia:any='';
  mes:any='';
  anio:any='';
  fecha:any='';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dashboardf: DashboardProvider, private authf:AuthProvider,
   private notaf: NotasProvider,public alertCtrl: AlertController,
    private productof:ProductosProvider) {
      this.idCliente = navParams.get("id");
  }
  ngOnInit(){ //se ejecuta cada vez que el componente inicia su carga
    this.allNotas();
     this.getFechaActual();
  }

  //funcion para obtener fecha actual
  getFechaActual() {
  
    this.fechaActual=new Date();
    this.anio=this.fechaActual.getFullYear();
    this.mes=parseInt(this.fechaActual.getMonth())+ 1 ;
    this.dia=this.fechaActual.getDate();
   // this.fe=Date.parse(this.fecha);
    if (this.mes < 10) { 
     this.mes = "0" + this.mes
    } 
    if (this.dia < 10) { 
      this.dia  = "0" + this.dia  
    }
    this.fecha=this.anio+"-"+this.mes+"-"+this.dia;
    
    console.log('fechaActual'+this.fecha);
    console.log('dia'+this.dia);
    console.log('mes'+this.mes);
    console.log('año'+this.anio);
  }

  //funcion para obtener datos del Dashboard
  detalleUsuarioDashboard(){
    this.dashboardf.getDatosDashboard().subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.numeroNotas=this.dashboard.contadorNotas;
      console.log(this.numeroNotas+'this.passwordnotas');
    });
  }

  //funcion para obtener todas las notas del cliente
  allNotas(){
    this.notaf.getAllNotas().subscribe(notas=>{
      this.notas=notas;
      this.listaNotas=notas;
    });  
  }
  
  //funcion que redirige a la pagina registro Nota
  goToRegistroDeNota(){
    this.navCtrl.push(RegistroNotasPage,{id:this.idCliente});
    
  }

  //funcion que redirige a la pagina editar nota
  editarNota(idNota:string){
    this.navCtrl.push(EditarNotasPage,{idNota});
  }

  //funcion para eliminar nota
  eliminarNota(nota){
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
               if(nota.imagenNota!=''){
                this.productof.deleteImagen(nota.imagenNota);
               } 
               this.numeroNotas=this.numeroNotas-1;
               this.dashboardf.updateUsuarioContadorNotas(this.numeroNotas);
               this.notaf.deleteNota(nota);

           }
        }
      ]
    });
    alert.present();
  }

  //funcion para obtener la lista de notas
   initiliazeItems():void{
    this.listaNotas=this.notas;
  }

   //funcion para buscar nota en la lista 
  getItems(ev:any){
    this.initiliazeItems();
    let val=ev.target.value;
    if(val && val.trim() !=''){
      this.listaNotas=this.listaNotas.filter((nota)=>{
        return (nota.titulo.toLowerCase().indexOf(val.toLowerCase()) >-1);
      })
    }
  }

  
  
 
}
