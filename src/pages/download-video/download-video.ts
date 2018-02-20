import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { Observable } from 'rxjs/Observable';
import { StorageProvider } from './../../providers/storage/storage';
import { ShowVideoDownloadPage } from '../show-video-download/show-video-download';


@Component({
  selector: "page-download-video",
  templateUrl: "download-video.html"
})
export class DownloadVideoPage {
  urlDown: Observable<any[]>;
  videos: any;
  dataLoad: boolean = false;
  dataVideo = {
    videoID: null,
    videoUrl: "",
    imgUrl: "",
    title: "",
    description: "",
    statusDown: false
  };
  videoDownload: any;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private ytProvider: YoutubeProvider,
    private transfer: FileTransfer,
    private file: File,
    private storageProvider: StorageProvider
  ) {
    if (this.navParams.get("video") !== undefined) {
      let video = this.navParams.get("video");
      console.log(this.navParams.get("video"));

      if (video.id.videoId) {
        console.log("TODOS LOS VIDEOS");
        this.dataVideo.videoID = video.id.videoId;
        this.dataVideo.title = video.snippet.title;
        this.dataVideo.description = video.snippet.description;
        this.dataVideo.imgUrl = video.snippet.thumbnails.default.url;
      } else {
        console.log("EDTALLER!!!!");
        this.dataVideo.videoID = video.snippet.resourceId.videoId;
        this.dataVideo.title = video.snippet.title;
        this.dataVideo.description = video.snippet.description;
        this.dataVideo.imgUrl = video.snippet.thumbnails.default.url;
      }

      this.storageProvider
        .setItem(this.dataVideo.videoID, this.dataVideo)
        .then(data => {
          console.log("GUARDADO");
          console.log(this.dataVideo);
          let toast = this.toastCtrl.create({
            message: "Descargando el Video!",
            duration: 4000
          });
          toast.present();
          this.downloadImg();
        })
        .catch(err => {
          console.log(err);
        });
    }

    this.getAllVideoDownload();
  }

  ionViewWillEnter() {
    this.getAllVideoDownload();
  }

  downloadImg() {
    console.log("DESCARGADO IMAGEN");
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer
      .download(
        this.dataVideo.imgUrl,
        this.file.dataDirectory + this.dataVideo.videoID + ".jpg"
      )
      .then(
        entry => {
          console.log("download IMAGE complete: " + entry.toURL());
          this.dataVideo.imgUrl = entry.toURL();
          this.downloadVideo();
        },
        error => {
          // handle error
          console.log(error);
        }
      );
  }

  downloadVideo() {
    console.log("DESCARGADO VIDEO");
    this.urlDown = this.ytProvider.getVideoDownload(this.dataVideo.videoID);
    this.urlDown
      .toPromise()
      .then(data => {
        console.log(data["url"]);
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer
          .download(
            data["url"],
            this.file.dataDirectory + this.dataVideo.videoID + ".mp4"
          )
          .then(
            entry => {
              this.dataVideo.videoUrl = entry.toURL();
              this.dataVideo.statusDown = true;
              console.log("download VIDEO complete: " + entry.toURL());
              this.storageProvider
                .setItem(this.dataVideo.videoID, this.dataVideo)
                .then(data => {
                  console.log("ACTUALIZADOO");
                  this.getAllVideoDownload();
                  this.toastCtrl.create({
                    message: "Tu video esta listo!",
                    duration: 3000
                  }).present();
                })
                .catch(err => {
                  console.log(err);
                });
            },
            error => {
              // handle error
              console.log(error);
            }
          );
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAllVideoDownload() {
    this.storageProvider
      .getAll()
      .then(videos => {
        this.videos = videos;
        // console.log(this.videos);
        this.dataLoad = true;
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteVideo(video) {
    if (video.statusDown) {
      this.file
        .removeFile(this.file.dataDirectory, video.videoID + ".jpg")
        .then(_ => {
          this.file
            .removeFile(this.file.dataDirectory, video.videoID + ".mp4")
            .then(_ => {
              this.storageProvider
                .deleteItem(video.videoID)
                .then(data => {
                  let toast = this.toastCtrl.create({
                    message: "Video Eliminado!",
                    duration: 3000
                  });
                  toast.present();
                  this.getAllVideoDownload();
                })
                .catch(err => {
                  console.log(err);
                  this.errOcurrido();
                });
            })
            .catch(err => {
              console.log(err);
              this.errOcurrido();
            });
        })
        .catch(err => {
          console.log(err);
          this.errOcurrido();
        });
    } else {
      this.storageProvider
        .deleteItem(video.videoID)
        .then(data => {
          let toast = this.toastCtrl.create({
            message: "Video Eliminado!",
            duration: 3000
          });
          toast.present();
          this.getAllVideoDownload();
        })
        .catch(err => {
          console.log(err);
          this.errOcurrido();
        });
    }
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

  deleteAllVideo() {
    this.storageProvider
      .deleteAll()
      .then(data => {
        let toast = this.toastCtrl.create({
          message: "Todos los videos Eliminados!",
          duration: 3000
        });
        toast.present();
        this.getAllVideoDownload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteAllConfirm() {
    if (this.videos.length > 0) {
      let confirm = this.alertCtrl.create({
        title: "Eliminar Todos los videos?",
        message: "Esta seguro de eliminar <b>TODOS LOS VIDEOS</b>?",
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
              this.deleteAllVideo();
            }
          }
        ]
      });
      confirm.present();
    } else {
      let toast = this.toastCtrl.create({
        message: "No tienes ningun video a eliminar!",
        duration: 3000
      });
      toast.present();
    }
  }

  showVideo(video) {
    console.log(video);
    this.navCtrl.push(ShowVideoDownloadPage, { video });
  }

  errOcurrido() {
    let toast = this.toastCtrl.create({
      message: "Ocurrio un error, favor intentalo de nuevo!",
      duration: 3000
    });
    toast.present();
  }
}
