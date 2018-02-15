import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DownloadVideoPage } from './../download-video/download-video';



@Component({
  selector: 'page-show-video',
  templateUrl: 'show-video.html',
})
export class ShowVideoPage {
  videos: Observable<any[]>
  // video:any;
  video: any;
  videoURL: string;
  titleVideo: string = "Titulo de Video";
  showDesc: boolean = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams) {


    this.video = this.navParams.get('video');
    if (this.navParams.get('videoId') !== undefined){
      this.videoURL = 'https://www.youtube.com/embed/' + this.navParams.get('videoId');
    }else {
      this.videoURL = 'https://www.youtube.com/embed/' + this.video.snippet.resourceId.videoId;
    }
  }

  ionViewDidLoad() {

  }

  showDescrip(){
    this.showDesc = !this.showDesc;
  }

  downloadVideo(video) {
    this.navCtrl.push(DownloadVideoPage, {video});
    // this.navCtrl.push(ShowVideoPage, { video });
  }

  showVideoDown() {
    this.navCtrl.setRoot(DownloadVideoPage)
  }

}
