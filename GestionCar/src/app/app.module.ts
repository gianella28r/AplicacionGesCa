import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, AlertController } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from "angularfire2/database";
//import { AngularFireOfflineModule } from 'angularfire2-offline';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CrearCuentaPage } from '../pages/crear-cuenta/crear-cuenta';
import { RecuperarCuentaPage } from '../pages/recuperar-cuenta/recuperar-cuenta';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';

// Importando Firebase /entorno config y inicializando
//import * as firebase from 'firebase';
import { entorno } from '../entorno/entorno';

import { registerLocaleData } from '@angular/common';
import localeEsEc from '@angular/common/locales/es-EC';
registerLocaleData(localeEsEc);
import { LOCALE_ID} from '@angular/core';

import RegistroClientesPage from '../pages/registro-clientes/registro-clientes';
import ClientesPage from '../pages/clientes/clientes';
import { ClientesProvider } from '../providers/clientes/clientes';
import {DetallesClientesPage} from '../pages/detalles-clientes/detalles-clientes';
import {EditarClientePage} from '../pages/editar-cliente/editar-cliente';

import { ProductosPage } from '../pages/productos/productos';
import { RegistroProductoPage } from '../pages/registro-producto/registro-producto';
import { ProductosProvider } from '../providers/productos/productos';
import {EditarProductoPage} from '../pages/editar-producto/editar-producto';

import { NotasPage } from '../pages/notas/notas';
import { RegistroNotasPage } from '../pages/registro-notas/registro-notas';
import { EditarNotasPage } from '../pages/editar-notas/editar-notas';
import { NotasUsuarioPage } from '../pages/notas-usuario/notas-usuario';
import { RegistroNotasUsuariosPage } from '../pages/registro-notas-usuarios/registro-notas-usuarios';

import { VentaCreditoPage } from '../pages/venta-credito/venta-credito';
import { VentaContadoPage } from '../pages/venta-contado/venta-contado';
import { PagoPage } from '../pages/pago/pago';
import { ReagendarPage } from '../pages/reagendar/reagendar';
import { AgendarPage } from '../pages/agendar/agendar';
import { EnviarDatosPage } from '../pages/enviar-datos/enviar-datos';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { AcercaPage } from '../pages/acerca/acerca';
import { AyudaPage } from '../pages/ayuda/ayuda';

import { ConfiguracionPage } from '../pages/configuracion/configuracion';


import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera} from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';

import Firebase from '@firebase/app'
import {FormsModule} from '@angular/forms'
import '@firebase/firestore'
import { NotasProvider } from '../providers/notas/notas';
import { VentasProvider } from '../providers/ventas/ventas';

import { CambiarPasswordPage } from '../pages/cambiar-password/cambiar-password';
import { CambiarCorreoPage } from '../pages/cambiar-correo/cambiar-correo';
import { UsuarioProvider } from '../providers/usuario/usuario';

import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Network } from '@ionic-native/network';
import { DashboardProvider } from '../providers/dashboard/dashboard';
//import { Chart } from 'chart.js';

//import { from } from 'rxjs/observable/from';
//firebase.initializeApp(entorno.firebase);
/*var db;
var app = firebase.initializeApp(entorno.firebase);
db = firebase.firestore(app);*/


const firebaseApp = Firebase.initializeApp(entorno.firebase)
const api = firebaseApp.firestore()
api.settings({timestampsInSnapshots: true})


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CrearCuentaPage,
    RecuperarCuentaPage,
    ClientesPage,
    RegistroClientesPage,
    DetallesClientesPage,
    EditarClientePage,
    ProductosPage,
    RegistroProductoPage,
    EditarProductoPage,
    NotasPage,
    RegistroNotasPage,
    EditarNotasPage,
    NotasUsuarioPage,
    RegistroNotasUsuariosPage,
    VentaCreditoPage,
    VentaContadoPage,
    PagoPage,
    ReagendarPage,
    AgendarPage,
    EnviarDatosPage,
    AcercaPage,
    ConfiguracionPage,
    CambiarPasswordPage,
    CambiarCorreoPage,
    AyudaPage,
    DashboardPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(entorno.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),//enablePersistence(),//
    AngularFireDatabaseModule, 
    FormsModule,
    AngularFireStorageModule,
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CrearCuentaPage,
    RecuperarCuentaPage,
    ClientesPage,
    RegistroClientesPage,
    DetallesClientesPage,
    EditarClientePage,
    ProductosPage,
    RegistroProductoPage,
    EditarProductoPage,
    NotasPage,
    RegistroNotasPage,
    EditarNotasPage,
    NotasUsuarioPage,
    RegistroNotasUsuariosPage,
    VentaCreditoPage,
    VentaContadoPage,
    PagoPage,
    ReagendarPage,
    AgendarPage,
    EnviarDatosPage,
    AcercaPage,
    ConfiguracionPage,
    CambiarPasswordPage,
    CambiarCorreoPage,
    AyudaPage,
    DashboardPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AlertController,
    ImagePicker,
    FileChooser,
    File,
    Camera,
    FilePath,
    CallNumber,
    SocialSharing,
    LocalNotifications,
    Network,
    Geolocation,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ClientesProvider,
    RegistroProductoPage,
    ProductosProvider,
    NotasProvider,
    VentasProvider,
    UsuarioProvider,
    DashboardProvider,
    { provide: LOCALE_ID, useValue: 'es-Ec' } 
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
