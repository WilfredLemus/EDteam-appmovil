import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EdtallerPage } from '../pages/edtaller/edtaller';
import { ShowVideoPage } from './../pages/show-video/show-video';
import { DownloadVideoPage } from './../pages/download-video/download-video';
import { ShowVideoDownloadPage } from '../pages/show-video-download/show-video-download';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
// import { VideoPlayer } from '@ionic-native/video-player';
import { YoutubeProvider } from '../providers/youtube/youtube';
import { YouTubePipe } from '../pipes/you-tube/you-tube';
import { IonicStorageModule } from '@ionic/storage';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EdtallerPage,
    ShowVideoPage,
    DownloadVideoPage,
    ShowVideoDownloadPage,
    YouTubePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EdtallerPage,
    ShowVideoPage,
    DownloadVideoPage,
    ShowVideoDownloadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // YoutubeVideoPlayer,
    YoutubeProvider,
    File,
    FileTransfer,
    StorageProvider,
    // VideoPlayer
  ]
})
export class AppModule {}
