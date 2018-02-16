import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DownloadVideoPage } from './../download-video/download-video';
import { StorageProvider } from '../../providers/storage/storage';



@Component({
  selector: "page-show-video",
  templateUrl: "show-video.html"
})
export class ShowVideoPage {
  videos: Observable<any[]>;
  video: any;
  videoURL: string;
  showDesc: boolean = false;
  checkDown: boolean = false;
  videoID: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storageProvider: StorageProvider
  ) {
    this.video = this.navParams.get("video");
    if (this.navParams.get("videoId") !== undefined) {
      this.videoID = this.navParams.get("videoId");
      this.videoURL =
        "https://www.youtube.com/embed/" + this.navParams.get("videoId");
    } else {
      this.videoID = this.video.snippet.resourceId.videoId;
      this.videoURL = "https://www.youtube.com/embed/" + this.video.snippet.resourceId.videoId;
    }
    this.checkVideoDownload();
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
    this.checkVideoDownload();
  }

  showDescrip() {
    this.showDesc = !this.showDesc;
  }

  downloadVideo(video) {
    this.navCtrl.push(DownloadVideoPage, { video });
    // this.navCtrl.push(ShowVideoPage, { video });
  }

  showVideoDown() {
    this.navCtrl.setRoot(DownloadVideoPage);
  }

  checkVideoDownload() {
    this.storageProvider
      .getAllIDs()
      .then(IDs => {
        if(IDs.indexOf(this.videoID) > - 1 ){
          this.checkDown = true;
        }else {
          this.checkDown = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
