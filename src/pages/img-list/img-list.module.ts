import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgListPage } from './img-list';

@NgModule({
  declarations: [
    ImgListPage,
  ],
  imports: [
    IonicPageModule.forChild(ImgListPage),
  ],
})
export class ImgListPageModule {}
