import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController, MenuController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Usuario } from '../../models/usuario';
import 'firebase/firestore';
import { Injectable } from "@angular/core";
import { LoginPage } from '../login/login';
@Injectable()
@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html',

})
export class CrearCuentaPage {
  usuario ={} as Usuario;
  passwordDos:any;
  constructor( public navCtrl:NavController, public navParams:NavParams, public loadingCtrl: LoadingController, public toastCtrl:ToastController,
    public alertCtrl: AlertController, public authf: AuthProvider, public menu:MenuController) {  
  }
//funcion para crear cuenta de usuario
    goToCrearCuenta() {

        if(this.usuario.password==this.passwordDos){
            console.log(this.usuario.password);
            console.log(this.passwordDos);
            
            let loading = this.loadingCtrl.create({
                content: 'Creando Cuenta'
            });
            loading.present();

            this.authf.createUserWithEmailAndPassword(this.usuario).then(result => {
                
                loading.dismiss();//ventana de cargando
                this.authf.logOut();
                this.navCtrl.setRoot(LoginPage);
                let alert = this.alertCtrl.create({
                    title: ' ',
                    message: 'Hemos enviado un link de verificación a su correo electrónico. Ábralo y haga click en activar',
                    buttons: ['OK']
                    });
                alert.present();

            }).catch(error => {
                loading.dismiss();
                console.log(error);
                var mensaje=error;
                console.log(mensaje+'este es el mensaje');
               // this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
                if(mensaje=="Error: The email address is already in use by another account."){
                    this.alert('','El correo electrónico ingresado esta siendo utilizado por otra cuenta.');
                }else{
                    this.alert('', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
                }
            
            }); 
        }else{
            let alert = this.alertCtrl.create({
              title: '',
              message: 'La contraseña y la confirmación de contraseña no coinciden. Por favor vuelva a intentar de nuevo.',
              buttons: ['OK']
        });
          alert.present();
        }
    }

    
    //funcion para presentar un mensaje
    alert(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
    
    //funcion para desactivar el menu
    ionViewDidEnter(){
        this.menu.enable(false);
    }

    //funcion para activar el menu
    ionViewWillLeave(){
        this.menu.enable(true);
    }
}
