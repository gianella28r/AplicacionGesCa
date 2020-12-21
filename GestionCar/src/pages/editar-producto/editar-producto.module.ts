import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarProductoPage } from './editar-producto';

@NgModule({
  declarations: [
    EditarProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarProductoPage),
  ],
})
export class EditarProductoPageModule {}
