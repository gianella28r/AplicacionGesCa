import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotasUsuarioPage } from './notas-usuario';

@NgModule({
  declarations: [
    NotasUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(NotasUsuarioPage),
  ],
})
export class NotasUsuarioPageModule {}
