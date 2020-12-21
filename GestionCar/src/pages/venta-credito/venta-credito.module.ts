import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VentaCreditoPage } from './venta-credito';

@NgModule({
  declarations: [
    VentaCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(VentaCreditoPage),
  ],
})
export class VentaCreditoPageModule {}
