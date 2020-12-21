import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroProductoPage } from './registro-producto';

@NgModule({
  declarations: [
    RegistroProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroProductoPage),
  ],
})
export class RegistroProductoPageModule {}
