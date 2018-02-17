import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { File } from "@ionic-native/file";


@IonicPage()
@Component({
  selector: "page-show-video-download",
  templateUrl: "show-video-download.html"
})
export class ShowVideoDownloadPage {
  video: any;
  videosDownload: any;
  showDesc: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storageProvider: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private file: File
  ) {
    this.video = this.navParams.get("video");
    this.getAllVideoDownload();
  }

  ionViewDidLoad() {}

  showDescrip() {
    this.showDesc = !this.showDesc;
  }

  getAllVideoDownload() {
    this.storageProvider
      .getAll()
      .then(videos => {
        this.videosDownload = videos;
      })
      .catch(err => {
        console.log(err);
      });
  }

  showVideo(video) {
    this.navCtrl.pop();
    this.navCtrl.push(ShowVideoDownloadPage, { video });
  }

  deleteVideo(video) {
    this.file.removeFile(this.file.dataDirectory, video.videoID + ".jpg").then(_ => {
      this.file.removeFile(this.file.dataDirectory, video.videoID + ".mp4").then(_ => {
        this.storageProvider.deleteItem(video.videoID).then(data => {
          let toast = this.toastCtrl.create({
            message: "Video Eliminado!",
            duration: 3000
          });
          toast.present();
          this.navCtrl.pop();
        }).catch(err => {
          console.log(err);
          this.errOcurrido();
        });
      }).catch(err => {
        console.log(err);
        this.errOcurrido();
      });
    }).catch(err => {
      console.log(err);
      this.errOcurrido();
    });
  }

  deleteVideoConfirm(video) {
    let confirm = this.alertCtrl.create({
      title: "Eliminar Video?",
      message: `Esta seguro de eliminar <b>${video.title}</b>?`,
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            console.log("Cancelar");
          }
        },
        {
          text: "Eliminar",
          handler: () => {
            this.deleteVideo(video);
          }
        }
      ]
    });
    confirm.present();
  }

  errOcurrido() {
    let toast = this.toastCtrl.create({
      message: "Ocurrio un error, favor intentalo de nuevo!",
      duration: 3000
    });
    toast.present();
  }
}
