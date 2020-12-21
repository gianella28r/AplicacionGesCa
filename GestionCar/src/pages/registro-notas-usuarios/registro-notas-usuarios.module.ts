import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroNotasUsuariosPage } from './registro-notas-usuarios';

@NgModule({
  declarations: [
    RegistroNotasUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroNotasUsuariosPage),
  ],
})
export class RegistroNotasUsuariosPageModule {}
