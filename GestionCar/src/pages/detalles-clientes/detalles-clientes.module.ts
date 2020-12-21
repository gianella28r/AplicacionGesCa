import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallesClientesPage } from './detalles-clientes';

@NgModule({
  declarations: [
    DetallesClientesPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallesClientesPage),
  ],
})
export class DetallesClientesPageModule {}
