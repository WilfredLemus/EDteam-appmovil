// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from "@ionic-native/network";
import { ToastController } from 'ionic-angular';


@Injectable()
export class NetworkStatusProvider {
  public connectNet: boolean = true;

  constructor(private network: Network, public toastCtrl: ToastController) {}


  testNetwork() {
    this.network.onConnect().subscribe(_ => {
      this.connectNet = true
      this.toastCtrl.create({
            message: "Red Conectada!",
            duration: 3000
          }).present();
    }, error => console.error(error));
    this.network.onDisconnect().subscribe(_ => {
      this.connectNet = false
      this.toastCtrl.create({
            message: "Red Desconectada!",
            duration: 3000
          }).present();
    }, error => console.error(error));
  }
}
