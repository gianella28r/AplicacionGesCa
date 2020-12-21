import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {
   
  usuarioCollection:AngularFirestoreCollection<Usuario>;
  usuarioDoc:AngularFirestoreDocument<Usuario>;
  Usuarios:Observable<Usuario[]>;
  usuario:Observable<Usuario>;
  currentUser: firebase.User;

  constructor(private afs: AngularFirestore) {
    console.log('Hello UsuarioProvider Provider');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
      }
    });
  }

  //funcion para el cambio de contraseña  en la Base de Datos
  usuarioCambioDatos(clave){
    this.usuarioDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}`);
    return this.usuarioDoc.update({
         password: clave
       })
       .then(function() {
        console.log("Document successfully updated!");
      })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });  
  }

  
//metodo para actualizar el password del usuario en el servicio de autenticación
  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
  
    return this.currentUser
    .reauthenticateAndRetrieveDataWithCredential(credential)
    .then(() => {
      this.currentUser.updatePassword(newPassword).then(() => {
        //this.userProfile.update({ email: newEmail });
        this.updateUsuarioPasswod(newPassword);
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  //metodo para autenticar usuario
  autenticarUsuario(passwordActual:string){
    var user = firebase.auth().currentUser;
    var email= user.email;
   // var credential=email;

    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      passwordActual
    );
    // Prompt the user to re-provide their sign-in credentials
    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
      // User re-authenticated.
    }).catch(function(error) {
      // An error happened.
    });
  }

  //metodo para actualizar el password del usuario en la base de datos
  updateUsuarioPasswod(clave:string){
    this.usuarioDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}`);
    return this.usuarioDoc.update({
         password: clave
       })
       .then(function() {
        console.log("Document successfully updated!");
      })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
  }

  //metodo para actualizar el email del usuario en el servicio de autenticacion
  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    return this.currentUser
    .reauthenticateAndRetrieveDataWithCredential(credential)
    .then(() => {
    this.currentUser.updateEmail(newEmail).then(() => {
      this.updateUsuarioEmail(newEmail);
      });
    })
    .catch(error => {
   console.error(error);
    });
  }

  //metodo para actualizar el email del usuario en el documento de la coleccion usuarios
  updateUsuarioEmail(email:string){
    this.usuarioDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}`);
    return this.usuarioDoc.update({
         email: email
       })
       .then(function() {
        this.sendVerificacionEmail();
        console.log("Document successfully updated!");
      })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
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
 
  //metodo para poder obtener documento con los datos del usuario
  getOneUsuario(){
   this.usuarioDoc= this.afs.doc<Usuario>(`Usuarios/${this.currentUser.uid}`);//no son comilas es template literals
   this.usuario=this.usuarioDoc.snapshotChanges().map(action=>{
     if(action.payload.exists==false){
       return null;
     }else{
       const data=action.payload.data() as Usuario;
       data.uid=action.payload.id;
       return data;
     }
   });
   return this.usuario;
 }

  //metodo para actualizar docuemnto con datos del usuario
  updateUsuario(usuario:Usuario){
    this.usuarioDoc= this.afs.doc(`Usuarios/${this.currentUser.uid}`);
    this.usuarioDoc.update(usuario);
  }

}
