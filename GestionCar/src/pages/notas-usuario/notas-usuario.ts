import { Component,OnInit,Output,EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController } from 'ionic-angular';
import { NotasProvider } from '../../providers/notas/notas';
import { Notas } from '../../models/notas';
import {EditarNotasPage} from '../editar-notas/editar-notas';
import {RegistroNotasUsuariosPage} from '../registro-notas-usuarios/registro-notas-usuarios';
import { ProductosProvider } from '../../providers/productos/productos';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Dashboard } from '../../models/dashboard';


/**
 * Generated class for the NotasUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notas-usuario',
  templateUrl: 'notas-usuario.html',
})
export class NotasUsuarioPage implements OnInit {
  notas:Notas[];
  listaNotas:Notas[];
  fechaActual:any='';
  dia:any='';
  mes:any='';
  anio:any='';
  fecha:any='';
  part1:any=[];
  part2:any=[];
  controlF:boolean=true;

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

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  constructor(public navCtrl: NavController, public navParams: NavParams,private notaf:NotasProvider,public dashboardf: DashboardProvider,public alertCtrl: AlertController,
  private productof:ProductosProvider, private localNotifications: LocalNotifications) {
    
  }

  ngOnInit(){ //se ejecuta cada vez que el componente inicia su carga
    this.allNotasUsuario();
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

  //funcion para obtener todas las notas del usuario
  allNotasUsuario(){
    this.notaf.getAllNotas().subscribe(notas=>{
      this.notas=notas;
      this.listaNotas=notas;
      
    });
  }

  //funcion que redirige a la pagina registro Nota
  goToRegistroDeNotaUsuario(){
    this.navCtrl.push(RegistroNotasUsuariosPage);
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
  /*notificaciones(){
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
      data: { secret: key }
    });
  }*/
}
