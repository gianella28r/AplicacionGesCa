import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../../models/usuario';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the CambiarCorreoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiar-correo',
  templateUrl: 'cambiar-correo.html',
})
export class CambiarCorreoPage implements OnInit {
  correoActual:string='';
  correoNuevo:string='';
  
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
  password: string;
  correoOld: any;
  no:string;
  passwordActual: any;
  constructor(public navCtrl: NavController,private alertCtrl: AlertController,public loadingCtrl: LoadingController,private authf:AuthProvider, public usuariof: UsuarioProvider,public navParams: NavParams) {
  }

  ngOnInit(){
    this.usuariof.getOneUsuario().subscribe(usuario=>{
      this.usuario=usuario;
      this.password=this.usuario.password;
      this.correoOld=this.usuario.email;
      this.no=this.usuario.nombres;
    });
  }

  //funcion para vincular los datos del usuario a otro correo eléctronico
  goToCambiarEmail(){
    if(this.correoActual==this.correoOld){
      if(this.passwordActual==this.password)
        if(this.correoActual!=this.correoNuevo){
          let alert = this.alertCtrl.create({
            title: '¿Está seguro de que desea cambiar el Correo Eléctronico?',
            message: 'Al cambiar el correo eléctronico se cerrará la sesión actual y deberá verificar el correo eléctronico nuevo',
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
                    let loading = this.loadingCtrl.create({
                      content: 'Hemos enviado un link de verificación a su correo electrónico, ábralo y haga click en activar'
                    });
                    loading.present();
                    this.usuariof.updateEmail(this.correoNuevo,this.password);
                    this.authf.logOut();
                    window.location.reload();
                    loading.dismiss();            
                }
              }
            ]
          });
          alert.present();
        
        }else{
          let alert = this.alertCtrl.create({
            title: '',
            message: 'El nuevo correo eléctronico no puede ser igual al anterior. Por favor vuelva a intentar',
            buttons: ['OK']
        });
        alert.present();
      }
      else{
        let alert = this.alertCtrl.create({
          title: '',
          message: 'La contraseña no coincide. Por favor vuelva a intentar.',
          buttons: ['OK']
        });
        alert.present();
      }
    }else{
      let alert = this.alertCtrl.create({
        title: '',
        message: 'El correo eléctronico actual no es correcto. Por favor vuelva a intentar.',
        buttons: ['OK']
    });
    alert.present();
    }
  }

}
