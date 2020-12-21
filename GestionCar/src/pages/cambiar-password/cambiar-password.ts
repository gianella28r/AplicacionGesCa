import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../../models/usuario';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the CambiarPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiar-password',
  templateUrl: 'cambiar-password.html',
})
export class CambiarPasswordPage implements OnInit{
  passwordActual:string='';
  passwordNuevo:string='';
  passwordVerificacion:string='';

  passwordType:string='password';//
  passwordShow: boolean=false;//
  
  usuario:Usuario ={
    uid:'',
    nombres:'',
    email:'',
    password:'',
    emailVerificado:'',
    contadorClientes:'',
    contadorVentas:'',
    contadorCobros:'',
    totalVendido:'',
    totalCobrado:'',
  };
  passwordA: any;
  constructor(public navCtrl: NavController,private authf:AuthProvider,private alertCtrl: AlertController, public usuariof: UsuarioProvider, public navParams: NavParams) {
  
  }

  ngOnInit(){
    this.usuariof.getOneUsuario().subscribe(usuario=>{
      this.usuario=usuario;
      this.passwordA=this.usuario.password;
      console.log(this.passwordA+'this.passwordA');
    });
  }
  
  //funcion para cambiar Password
  goToCambiarPassword(){
    console.log(this.passwordActual+'this.passwordActual');
    if(this.passwordA==this.passwordActual){
      console.log(this.passwordActual+'passqworactual');
      if(this.passwordA!=this.passwordNuevo){
        if(this.passwordNuevo==this.passwordVerificacion){
          this.usuariof.updatePassword(this.passwordNuevo,this.passwordActual);
          let alert = this.alertCtrl.create({
            message: 'Contraseña cambiada con éxito',
            buttons: ['OK']
           });
          alert.present();
          this.navCtrl.pop();
          //this.authf.logOut();
          //window.location.reload();
        }else{
          let alert = this.alertCtrl.create({
            title: 'La contraseña Nueva y Verificación de Contraseña no coinciden',
            message: 'Por favor vuelva a intentar',
            buttons: ['OK']
        });
        alert.present();
        }
      }else{
        let alert = this.alertCtrl.create({
          title: 'La contraseña nueva no puede ser igual a la anterior',
          message: 'Por favor vuelva a intentar',
          buttons: ['OK']
      });
      alert.present();
      }   
    }else{
      let alert = this.alertCtrl.create({
        title: 'La contraseña actual no es correcta ',
        message: 'Por favor vuelva a intentar',
        buttons: ['OK']
    });
    alert.present();
    }
  }

  /*mostrarPassword(){
    console.log('siingresa');
    if(this.passwordShow){
      this.passwordShow=false;
      this.passwordType='password';
    }else{
      this.passwordShow=true;
      this.passwordType='text';
    }
  }*/
  

}
