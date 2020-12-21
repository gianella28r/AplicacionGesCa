import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VentaContadoPage } from './venta-contado';

@NgModule({
  declarations: [
    VentaContadoPage,
  ],
  imports: [
    IonicPageModule.forChild(VentaContadoPage),
  ],
})
export class VentaContadoPageModule {}
