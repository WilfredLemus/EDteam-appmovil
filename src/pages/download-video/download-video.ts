import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
// import { VideoPlayer } from '@ionic-native/video-player';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { Observable } from 'rxjs/Observable';
import { ShowVideoDownloadPage } from '../show-video-download/show-video-download';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-download-video',
  templateUrl: 'download-video.html',
})
export class DownloadVideoPage {

  uriVideo:any;
  storageDirectory: string = '';
  urlDown: Observable<any[]>;
  constructor(public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams,
              private ytProvider: YoutubeProvider,
              private transfer: FileTransfer,
              private file: File,
              ) {


    // this.downloadVideo();
  }

  ionViewDidLoad() {

  }

  downloadVideo(){
    // const url = 'https://www.youtube.com/watch?v=2JeKfQ2r2r8';
    // const url = 'https://www.youtubepp.com/watch?v=2JeKfQ2r2r8';
    // const data = 'oAGmxVWh_NI'
    // const url = 'https://paginawebmedia.com/wp-content/uploads/2017/10/ionic.png';
    // const url = 'https://player.vimeo.com/external/85569724.sd.mp4?s=43df5df0d733011263687d20a47557e4'
    // const urlBase = 'https://helloacm.com/api/video/?cached&lang=en&hash=1443b23802e83bb311e5a36af7bd4f3a&video=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D';
    let videoID = 'j5akWM1moko';

    this.urlDown = this.ytProvider.getVideoDownload(videoID);
    this.urlDown.toPromise()
      .then(data => {
        console.log(data['url']);
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.download(data['url'], this.file.dataDirectory + 'videoyoutube.mp4').then((entry) => {
          this.uriVideo = this.file.dataDirectory + 'videoyoutube.mp4';
          console.log('download complete: ' + entry.toURL());
        }, (error) => {
          // handle error
          console.log(error);
        });


      })
      .catch(err => {
        console.log(err)
      })

  }

}
