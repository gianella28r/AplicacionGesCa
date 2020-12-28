import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { CrearCuentaPage } from '../crear-cuenta/crear-cuenta';
import { RecuperarCuentaPage } from '../recuperar-cuenta/recuperar-cuenta';
import { Usuario } from '../../models/usuario';
import { DashboardPage } from '../dashboard/dashboard';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage implements OnInit {
  public form   : FormGroup;
  usuario={} as Usuario;
  emailVerificado: boolean;
 
  emai= localStorage.getItem('correoGuardado');
  email:string=this.emai;
  constructor(public navCtrl: NavController, private _FB: FormBuilder,private authf: AuthProvider, private usuariof: UsuarioProvider, private alertCtrl: AlertController,
    public menu:MenuController,private authfires:AngularFirestoreModule) {
     //this.verificacion();
     
    this.form = this._FB.group({
      'email'        : [this.email, Validators.required],
      'password'     : ['', Validators.required]
   });
  
  }
  
  ngOnInit(){
    
    
  }

  verificacion(){
    var cla= localStorage.getItem('clave');
    console.log(cla+ema+'clavey email');
    var ema= localStorage.getItem('correo');

    if(cla!=null && ema!=null){
      this.authf.loginWithEmailAndPassword(ema,cla)
     .then((auth : any) =>
      {
        this.navCtrl.setRoot(DashboardPage);
       
      })
  }
}
  
  //funcion para validar el ingreso del usuario a la aplicacion
  logIn() : void
  {
     let email      : any  = this.form.controls['email'].value,
         password   : any  = this.form.controls['password'].value;    
     this.authf.loginWithEmailAndPassword(email, password)
     .then((auth : any) =>
      {
       if(this.authf.verificar){
       console.log(this.authf.verificar+'si');
       this.navCtrl.setRoot(DashboardPage);
       
       this.usuariof.usuarioCambioDatos(password);
       
       }
       else{ 
         var condicion: any;
        if(condicion==false){
        this.authf.logOut();
        this.authf.logOut();
        console.log(this.authf.emailVerificado+'no');
        let alert = this.alertCtrl.create({
        title: '',
        message: 'Hemos enviado un link de verificación a su correo electrónico. Ábralo y haga click en activar',
        buttons: ['OK']
        });
        alert.present();

        }
        
      }
     })
     .catch(error =>
     {
      let alert = this.alertCtrl.create({
        //title: 'Por favor, revisa e inténtalo de nuevo ',
        message: 'El correo electrónico y la contraseña que ingresaste no coinciden con nuestros registros. Por favor, revisa e inténtalo de nuevo.',
        buttons: ['OK']
     });
     alert.present();
     console.log(error.message);
    });
  }
  
  //funcion para deshabilitar el menu
  ionViewDidEnter(){
    this.menu.enable(false);
  }

  //funcion para habilitar el menu
  ionViewWillLeave(){
    this.menu.enable(true);
  }

  //funcion para redirigir a la pagina de Crear Cuenta
  goToCrearCuenta(){
    this.navCtrl.push(CrearCuentaPage);
  }

  //funcion para redirigir a la pagina de Recuperar Cuenta
  goToRecuperarCuenta(){
    this.navCtrl.push(RecuperarCuentaPage);
  }

  //funcion para permisos notificaciones push


}                             
