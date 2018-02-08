import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShowVideoPage } from "../../pages/show-video/show-video";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  showVideo(){
    this.navCtrl.push(ShowVideoPage);
  }

}
