import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
/**
 * Generated class for the RecuperarCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-cuenta',
  templateUrl: 'recuperar-cuenta.html',
})
export class RecuperarCuentaPage {
  myForm: FormGroup;
  usuario ={} as Usuario;

  constructor( public navCtrl:NavController, public navParams:NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public auth: AuthProvider, private formBuilder: FormBuilder,public menu:MenuController
  ) {
        this.myForm = this.formBuilder.group({
          'email': ['', Validators.required]
    });
  }

  //funcion para recuperar cuenta por medio del email
  resetPassword() : void { 
    let email      : any  = this.myForm .controls['email'].value;
    this.auth.sendPasswordResetEmail(email)
      .then((user) => {
        let alert = this.alertCtrl.create({
          message: "Se ha enviado un link de recuperación de cuenta a su correo electrónico.",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }, (error) => {
        let errorAlert = this.alertCtrl.create({
          message: 'No pudimos encontrar tu cuenta con esa información. Por favor, verifique su correo electrónico e intente de nuevo',
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        errorAlert.present();
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
  
}

