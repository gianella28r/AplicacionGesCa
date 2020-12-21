import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CambiarPasswordPage } from './cambiar-password';

@NgModule({
  declarations: [
    CambiarPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(CambiarPasswordPage),
  ],
})
export class CambiarPasswordPageModule {}
