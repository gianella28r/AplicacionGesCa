import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//importando paginas y autenticacion del provider
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import  ClientesPage  from '../pages/clientes/clientes';
import { ProductosPage } from '../pages/productos/productos';
import { NotasUsuarioPage } from '../pages/notas-usuario/notas-usuario';
import { AcercaPage } from '../pages/acerca/acerca';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { auth } from 'firebase';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import {App} from 'ionic-angular'



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //estableciendo pagina inicial de la aplicacion
  public rootPage:any;
  public a:any;

  //Creando las variables del menu
  private pages: Array<{title: string, component: any}>;
  private clientes: Array<{title: string, component: any}>;
  private productos: Array<{title: string, component: any}>;
  private notas: Array<{title: string, component: any}>;
  private dashboard: Array<{title: string, component: any}>;
  private configuracion: Array<{title: string, component: any}>;
  private ayuda: Array<{title: string, component: any}>;
  private acerca: Array<{title: string, component: any}>;
  private cerrar: Array<{title: string, component: any}>;
  loading: any;
  public cla:any;
  public ema:any;
  public usuario:any;

  constructor(public platform: Platform, public app: App, public statusBar: StatusBar,public splashScreen: SplashScreen, private _AUTH:AuthProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.cla= localStorage.getItem('clave');
     
    this.ema= localStorage.getItem('correo');
 
    
    this.clientes = [
      { title: 'Gestión de Clientes', component: ClientesPage }
    ];
    this.productos = [
      { title: 'Gestión de Productos', component: ProductosPage }
    ];
    this.notas = [
      { title: 'Gestión de Notas', component: NotasUsuarioPage }
    ];
    this.dashboard = [
      { title: 'Tablero de Control', component: DashboardPage }
    ];
    this.configuracion = [
      { title: 'Configuración', component: ConfiguracionPage }
    ];
    this.ayuda = [
      { title: 'Ayuda', component: AyudaPage }
    ];
    this.acerca = [
      { title: 'Acerca de', component: AcercaPage }
    ];
    this.cerrar = [
      { title: 'Cerrar Sesión', component: LoginPage }
    ];
        console.log('3');
  }
  ngOnInit() {
    //this._AUTH.logOut();
    
    this.initializeApp();

    
  }

  initializeApp(): void{ 
    console.log('4');

     this.platform.ready().then(() => {
      console.log('5');
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide(); 
            
        this.splashScreen.hide(); 
        setTimeout(() => {   
          firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
              this.usuario=user;
              if(this._AUTH.lo){
                this.rootPage =  DashboardPage;
              }else{
                  this.rootPage =  LoginPage;
              }
            } else {
              this.rootPage =  LoginPage;
            }
          });
          },3000)
        console.log(this.cla+this.ema+'clavey email');
             
    });
       
  }

 /* usuarioDate(){
    this.usuariof.getOneUsuario().subscribe(cliente=>{
      this.usuario=cliente;
    }); 
  }*/

 
  openPage(page:any):void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log('6');
    if(page == 'logOut')
    {
      this._AUTH.logOut()
        .then((date : any) =>
        {
          this.nav.setRoot(page.component);
        })
        .catch((error : any) =>
        {
          console.dir(error);
        });
    }else{
      this.nav.setRoot(page.component);

    }
  }

  cerrarPage(page:any):void{
    if(page == 'logOut')
    {
      this._AUTH.logOut()
        .then((date : any) =>
        {
          this.nav.setRoot(page.component);
          //this.rootPage=LoginPage;
          console.log('aqui1');
        })
        .catch((error : any) =>
        {
          console.dir(error);
        });
    }else{
      console.log('aqui2');
      let alert = this.alertCtrl.create({
        message: '¿Está seguro de que desea Cerrar Sesión?',
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
                //AquÍ borramos el sitio en la base de datos
                this.loading = this.loadingCtrl.create({
                 content: 'Cerrando Sesión. Por favor, espere...'
                });
                this.loading.present();
                this._AUTH.logOut();
                //this.nav.setRoot(page.component);
                //
                //this.rootPage=LoginPage;
                localStorage.removeItem('correo');
                window.location.reload();
                this.loading.dismiss();

                 /* this.authf.signOut();
                  window.location.reload();
                  */
             }
          }
        ]
      });
      alert.present();
    }
  }

  /*
  cerrarPage(page:any):void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let alert = this.alertCtrl.create({
      message: '¿Esta seguro de que desea Cerrar Sesión?',
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
            this.cerrarP();
               // AquÍ borramos el sitio en la base de datos
              // let loading = this.loadingCtrl.create({
               // content: 'Cerrando Sesión. Por favor, espere...'
               //});
                //loading.present();
                
                //this.nav.setRoot(page.component);
                //loading.dismiss();
           }
        }
      ]
    });
    alert.present();
  }

  cerrarP(){

  }
    /*window.location.reload();
    let alert = this.alertCtrl.create({
      message: '¿Esta seguro de que desea Cerrar Sesión?',
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
              // let loading = this.loadingCtrl.create({
               // content: 'Cerrando Sesión. Por favor, espere...'
               //});
                //loading.present();
                
                //this.nav.setRoot(page.component);
                //loading.dismiss();
           }
        }
      ]
    });
   // alert.present();
    //this.nav.setRoot(page.component);*/
  /*}
  cerrarPage(page:any):void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let loading = this.loadingCtrl.create({
      content: 'Cerrando Sesión. Por favor, espere...'
     });
     this.authf.logOut();
     loading.present();
     window.location.reload();
     loading.dismiss();

   
    /*window.location.reload();
    let alert = this.alertCtrl.create({
      message: '¿Esta seguro de que desea Cerrar Sesión?',
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
              // let loading = this.loadingCtrl.create({
               // content: 'Cerrando Sesión. Por favor, espere...'
               //});
                //loading.present();
                
                //this.nav.setRoot(page.component);
                //loading.dismiss();
           }
        }
      ]
    });
   // alert.present();
    //this.nav.setRoot(page.component);
  }*/

}
