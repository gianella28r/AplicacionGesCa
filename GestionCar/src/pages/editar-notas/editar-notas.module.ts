import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarNotasPage } from './editar-notas';

@NgModule({
  declarations: [
    EditarNotasPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarNotasPage),
  ],
})
export class EditarNotasPageModule {}
