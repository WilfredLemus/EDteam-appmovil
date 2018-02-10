import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EdtallerPage } from '../pages/edtaller/edtaller';
import { ShowVideoPage } from './../pages/show-video/show-video';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player'; ELIMINAR
import { YoutubeProvider } from '../providers/youtube/youtube';
import { YouTubePipe } from '../pipes/you-tube/you-tube';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EdtallerPage,
    ShowVideoPage,
    ListPage,
    YouTubePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EdtallerPage,
    ShowVideoPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // YoutubeVideoPlayer,
    YoutubeProvider
  ]
})
export class AppModule {}
