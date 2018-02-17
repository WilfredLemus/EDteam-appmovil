import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { YoutubeProvider } from '../../providers/youtube/youtube';
// import { Observable } from 'rxjs/Observable';
import { ShowVideoPage } from "../../pages/show-video/show-video";
import { DownloadVideoPage } from '../download-video/download-video';
import { NetworkStatusProvider } from '../../providers/network-status/network-status';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  // listData: Observable<any[]>;
  listVideos: any = [];
  totalResults: number;
  PageToken: any;
  dataLoad: boolean = false;
  showsearch: boolean = false;

  constructor(
    public navCtrl: NavController,
    private ytProvider: YoutubeProvider,
    public toastCtrl: ToastController,
    public networkStatus: NetworkStatusProvider
  ) {}

  ionViewDidLoad() {
    this.getListVideos();
  }

  getListVideos() {
    // this.listData = this.ytProvider.getListVideos();
    // this.listData.subscribe(
    this.ytProvider.getListVideos().subscribe(data => {
        console.log(data);
        // this.listVideos = data["items"];
        this.listVideos = this.listVideos.concat(data["items"]);
        this.dataLoad = true;
        this.PageToken = data["nextPageToken"];
        this.totalResults = data["pageInfo"]["totalResults"];
      }, err => {
        console.log("ERROR: " + err);
      });
  }

  showVideo(video) {
    if (this.networkStatus.connectNet) {
      let videoId = video.id.videoId;
      this.navCtrl.push(ShowVideoPage, { video, videoId });
    } else {
      this.navCtrl.setRoot(DownloadVideoPage);
    }
  }

  showVideoDown() {
    this.navCtrl.setRoot(DownloadVideoPage);
  }

  loadNextVideos(infiniteScroll) {
    console.log(this.PageToken);
    this.ytProvider.getListVideosNextPage(this.PageToken).subscribe(data => {
      // console.log(data);
      this.listVideos = this.listVideos.concat(data["items"]);
      this.dataLoad = true;
      this.PageToken = data["nextPageToken"];
      this.totalResults = data["pageInfo"]["totalResults"];
      infiniteScroll.complete();
    }, err => {
      console.log("ERROR: " + err);
    });

    if(this.totalResults == this.listVideos.length) {
      infiniteScroll.enable(false);
    }
  }

  showSearch() {
    // this.showsearch = !this.showsearch;
    this.toastCtrl.create({
      message: "Estamos trabajando en ello =)",
      duration: 3000
    }).present();
  }
}
