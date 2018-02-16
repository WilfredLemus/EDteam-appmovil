import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { Observable } from 'rxjs/Observable';
import { ShowVideoPage } from "../../pages/show-video/show-video";
import { DownloadVideoPage } from '../download-video/download-video';
import { NetworkStatusProvider } from '../../providers/network-status/network-status';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  listVideos: Observable<any[]>;
  dataLoad: boolean = false;
  showsearch: boolean = false;

  constructor(
    public navCtrl: NavController,
    private ytProvider: YoutubeProvider,
    public toastCtrl: ToastController,
    public networkStatus: NetworkStatusProvider,
  ) {}

  ionViewDidLoad() {
    this.getListVideos();
  }

  getListVideos() {
    this.listVideos = this.ytProvider.getListVideos();
    this.listVideos.subscribe(
      data => {
        console.log(data);
        this.dataLoad = true;
      },
      err => {
        console.log("ERROR: " + err);
      }
    );
  }

  showVideo(video) {
    if(this.networkStatus.connectNet){
      let videoId = video.id.videoId;
      this.navCtrl.push(ShowVideoPage, { video, videoId });
    }else {
      this.navCtrl.setRoot(DownloadVideoPage);
    }
  }

  showVideoDown() {
    this.navCtrl.setRoot(DownloadVideoPage);
  }
}
