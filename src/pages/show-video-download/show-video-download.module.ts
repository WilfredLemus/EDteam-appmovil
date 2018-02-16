import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowVideoDownloadPage } from './show-video-download';

@NgModule({
  declarations: [
    ShowVideoDownloadPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowVideoDownloadPage),
  ],
})
export class ShowVideoDownloadPageModule {}
