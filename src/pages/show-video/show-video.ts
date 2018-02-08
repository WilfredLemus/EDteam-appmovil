import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-show-video',
  templateUrl: 'show-video.html',
})
export class ShowVideoPage {
  titleVideo: string = "Titulo de Video";
  showDesc: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowVideoPage');
  }

  showDescrip(){
    this.showDesc = !this.showDesc;
  }

}
