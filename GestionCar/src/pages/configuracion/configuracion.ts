import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CambiarPasswordPage } from '../cambiar-password/cambiar-password';
import { CambiarCorreoPage } from '../cambiar-correo/cambiar-correo';

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  //funcion que redirige a la Pagina Cambiar Correo
  goToCambiarCorreo(){
    this.navCtrl.push(CambiarCorreoPage);
  }

  //funcion que redirige a la Pagina Cambiar Password
  goToCambiarClave(){
    this.navCtrl.push(CambiarPasswordPage);
  }

}
