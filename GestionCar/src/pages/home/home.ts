import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';
import {Plugins, PushNotification, PushNotificationToken} from '@capacitor/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient} from '@angular/common/http';
//import * as cors from 'cors';
import *  as express from 'express';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token:string='';
  constructor(public http: HttpClient, public navCtrl: NavController, public auth: AuthProvider, private db:AngularFirestore) {}
  
  ngOnInit(){

    

    //this.notificarClients();
  }

  saveTokenFirebase(){
    //this.db.collection('tokens').add()
    
    this//uid de usuario logueado y ahi guardzsr el token
  }

  notificarClients(){
    //Consultar si en ese dia ya se a notificado => si ya estano hacerlo sino hacerlo
    //consultar lista de microempresarios=> recorrer esa lista q tb debe traer el campo token
    //En cada uno desas iteraciones=>  usar lo de abajo el post

    let datos = { 
      "to" : "YOUR_FCM_TOKEN token de los lcientes",
      "data" : {
        "body" : "aquien pagar y el valor \n siguiente cliente etcetc.... ",
        "title": "Notification Title"
      },
      "notification" : {
        "body" : "Body of Your Notification",
        "title": "Title of Your Notification"
      }
    }
  
    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAActQGPhY:APA91bF_6u1TjJ-1uXGO6598aGRQaN8xPXyhPmJasO0m1TNlmFXznfmmqqhGheThDNJ-Immw-m90y-ZimpeIOiHhXgZwq51g0_6limM-whY2VWaLmoBtSjBbl3PGiiTZXi4wqXScSEa7'
      }
    };
    var url = 'https://fcm.googleapis.com/fcm/send';
    return new Promise(resolve => {
      this.http.post(url,JSON.stringify(datos),options)
        .subscribe(data => {
          resolve(data);
          });
    });
  }

  /*app.post('/', async(req,res)=>{

  let token=req.body.token;
  try{
    let response= await admin.messaging().send({
      notification:{
        title: 'Primer notification',
        body:''    
      },
      token:token
    });
    return res.json(response);

  }catch(err){
    return res.json(err).status(500);
  }*/
} 
