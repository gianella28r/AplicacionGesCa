import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroNotasPage } from './registro-notas';

@NgModule({
  declarations: [
    RegistroNotasPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroNotasPage),
  ],
})
export class RegistroNotasPageModule {}
