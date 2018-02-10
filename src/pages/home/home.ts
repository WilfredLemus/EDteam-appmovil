import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { Observable } from 'rxjs/Observable';
import { ShowVideoPage } from "../../pages/show-video/show-video";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listVideos: Observable<any[]>;
  dataLoad: boolean = false;
  showsearch: boolean = false;

  constructor(public navCtrl: NavController,
              private ytProvider: YoutubeProvider) {

  }

  ionViewDidLoad() {
    this.getListVideos();
  }

  getListVideos(){
    this.listVideos = this.ytProvider.getListVideos();
    this.listVideos.subscribe(data => {
      console.log(data);
      this.dataLoad = true;
    }, err => {
      console.log('ERROR: ' + err);
    })
  }

  showVideo(video) {
    console.log(video);
    let videoId = video.id.videoId;
    this.navCtrl.push(ShowVideoPage, { video, videoId});
  }

}
