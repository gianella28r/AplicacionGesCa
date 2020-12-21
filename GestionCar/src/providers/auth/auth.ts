import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Usuario } from '../../models/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';
import { User} from 'firebase/app';
import { LoginPage } from '../../pages/login/login';
import { TokenUsuario } from '../../models/tokenUsuario';
import { NavController } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public user:Observable <any>;
  _DB: any;
  Afauth: any;
  db: any;
  userr: User;
  us: User;//user/app
  //private userr: Observable<firebase.User | null >;
  f:boolean;
  authState = new BehaviorSubject(false);
  u:string;
  clienteCollection: any;
  emailVerificado: boolean;
  rootPage: typeof LoginPage;
   emailC: any;
  token: TokenUsuario = {  
    uid:'',
    email:'',
    emailVerificado:'',
    password: '',
    token:'',
  } 


 
 // constructor(public http: Http, private db: AngularFirestore, Afauth: AngularFireAuth) {
  constructor(public http: Http,private auth:AngularFireAuth){
  //let db=firebase.firestore();

    
  firebase.auth().onAuthStateChanged((user)=>
      {
        if (user)
        {
          // Usuario ha iniciado sesion
         var emailV=user.emailVerified;
         console.log(emailV+'emailV');
         this. emailVerificado = user.emailVerified;
         var displayName = user.displayName;
         var email = user.email;
         this.emailC=user.email;
         var uid = user.uid;
         var textoVerificao='';
         if(this.emailVerificado===false){
            console.log(this.emailVerificado+'no52');
         }
         else{
          console.log(this.emailVerificado+'si2');
         }
         var providerData = user.providerData;
         //
                
          this.userr=user;
     
          
          //this.userr = this.auth.authState;
          //
          window.localStorage.setItem("id",user.uid);
          console.log('Usuario ha iniciado sesion'+user.uid);
         
          console.log('Usuario ha iniciado sesion'+user.email);
          console.log(user+'nuser');  

          
        }
        else
        {
                 
          
          this.f=false;
          // El usuario no ha iniciado sesion
          console.log('El usuario no ha iniciado sesion');
        }
    } )
    
    

  
  }

  
  ngOnInit() {
   
  }

  

 isAuthenticated() {
    return this.authState.value;
  }
  
  
 
 /* estado(esta:any){
    
    esta=this.estado;
    console.log(esta+'estado');
    return esta;
  }*/
 
  //metodo para verificaf si existe un usuario autenticado 
  get authenticated(): boolean {
    return this.userr != null;
  }
  //metodo para el email cambiado
  get email(): boolean {
    return this.userr != null;
  }

  //obtener authentication
  get authenticate(): boolean {
    return this.userr == null;
  }
  //obtener session
  get Session() {
    return this.auth.authState;
}

  //verificar si el usuario ha verificado el email
  get verificar():boolean{
    return this.emailVerificado===true;
  }

 //2 metodo para obtener el usuario actual funcionando con components
 getCurrentUser(auth) {
  let userLoaded = false;
  return new Promise((resolve, reject) => {
     if (userLoaded) {
          resolve(firebase.auth().currentUser);
     }
     const unsubscribe = auth.onAuthStateChanged(user => {
        userLoaded = true;
        
        unsubscribe();
        resolve(user);
        console.log(user+'rr')
     }, reject);
  });
 }


  //metodo para iniciar sesion
 loginWithEmailAndPassword(email: string, password  : string): Promise<any> {
  return this.auth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then( () => {
      localStorage.setItem('correo', email); 
      localStorage.setItem('correoGuardado', email); 
      localStorage.setItem('clave',password);
      var cla= localStorage.getItem('clave');
      console.log("clave"+cla);
      
      return this.auth.auth.signInWithEmailAndPassword(email,password);
    }).catch(err => {
      return Promise.reject(err);
    })
}

  get lo(): boolean{
    var ema= localStorage.getItem('correo');
   // var e=localStorage.email;
   // alert(ema+'e');
    return  ema !=null && ema!='';
  }

  /*isAuthenticated() {
    return this.authenticationState.value;
  }*/
  //metodo para cerrar sesion
  logOut(){
    return new Promise ((resolve, reject) =>{
      if( firebase.auth().currentUser){
          firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          //this.navCtrl.setRoot(LoginPage);
          //this.authState.next(false);
            resolve();
        }).catch((error) =>{
            reject();
        });
      } 
    })
  }
  

//Metodo para crear usuario en servicio de autenticacion y luego guardar en la base de datos Firestore
  createUserWithEmailAndPassword(usuario:Usuario){
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.password) .then(res => {//auth acceso a todas las propiedades
        const uid= res.user.uid;  //obtener el uid del usuario
        this.sendVerificacionEmail();
        var userRef = firebase.firestore().collection('Usuarios').doc(res.user.uid);
         userRef.set({
         nombres: usuario.nombres,
         email:usuario.email,
         password:usuario.password,
         uid: uid,
        });    
        var userDashboard= firebase.firestore().collection('Usuarios').doc(res.user.uid).collection('Dashboard').doc(res.user.uid);
         userDashboard.set({
         contadorClientes:0,
         contadorProductos:0,
         contadorNotas:0,
         contadorVentas:0,
         contadorCobros:0,
         totalVendido:'0',
         totalCobrado:'0',
         uid: uid,
        })    
        
        resolve(res)
      }).catch( err =>reject(err))
    })
    
  }  


 // metodo para verificar si existe el usuario
  getAuth(){
    return this.auth.authState.map(auth=>auth);
  }

  //metodo para recuperar contraseña
  sendPasswordResetEmail(email):Promise<any>{
    return firebase.auth().sendPasswordResetEmail(email);  
  }

  //metodo para salir de la aplicacion
  signOut(): Promise<any> {
    return firebase.auth().signOut();
  }

  //metodo para verificar correo electronico
  sendVerificacionEmail(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }


}




