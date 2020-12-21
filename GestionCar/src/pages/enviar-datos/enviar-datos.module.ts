import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnviarDatosPage } from './enviar-datos';

@NgModule({
  declarations: [
    EnviarDatosPage,
  ],
  imports: [
    IonicPageModule.forChild(EnviarDatosPage),
  ],
})
export class EnviarDatosPageModule {}
