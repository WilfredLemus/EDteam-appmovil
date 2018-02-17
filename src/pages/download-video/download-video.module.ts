import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadVideoPage } from './download-video';

@NgModule({
  declarations: [
    DownloadVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(DownloadVideoPage),
  ],
})
export class DownloadVideoPageModule {}
