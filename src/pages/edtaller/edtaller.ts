import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NetworkStatusProvider } from "../../providers/network-status/network-status";

import { ShowVideoPage } from "../../pages/show-video/show-video";
import { DownloadVideoPage } from '../download-video/download-video';

@IonicPage()
@Component({
  selector: "edtaller",
  templateUrl: "edtaller.html"
})
export class EdtallerPage {
  playlists: Observable<any[]>;
  videosEDtaller: Observable<any[]>;
  dataLoad: boolean = false;
  showsearch: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private ytProvider: YoutubeProvider,
    public toastCtrl: ToastController,
    public networkStatus: NetworkStatusProvider
  ) {}

  ionViewDidLoad() {
    this.getVideosEDtaller();
  }


  showSearch() {
    this.showsearch = !this.showsearch;
  }

  getVideos() {
    this.playlists = this.ytProvider.getVideosEDtaller();
    this.playlists
      .toPromise()
      .then(data => {
        this.dataLoad = true;
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: "Error",
          message: "Ha ocurrido un error, al obtener los datos.",
          buttons: ["OK"]
        });
        alert.present();
        console.log(err);
      });
    // this.playlists.subscribe(data => {
    //   console.log(data);
    //   this.dataLoad = true;
    // }, err => {
    //   console.log('ERROR: ' + err);
    // })
  }

  getVideosEDtaller() {
    this.videosEDtaller = this.ytProvider.getVideosEDtaller();
    this.videosEDtaller.subscribe(
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
    if(this.networkStatus.connectNet) {
      this.navCtrl.push(ShowVideoPage, { video });
    }else {
      this.navCtrl.setRoot(DownloadVideoPage);
    }
  }

  showVideoDown() {
    this.navCtrl.setRoot(DownloadVideoPage);
  }
}
