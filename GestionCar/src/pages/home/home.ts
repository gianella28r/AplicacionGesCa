import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthProvider) {

  }
  ngAfterViewInit(){

    /*setTimeout(() => {
      if(this.auth.logueado){
        this.navCtrl.setRoot(DashboardPage);
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    }, 2000)*/
  }
  
    
}
