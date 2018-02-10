import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';

/*
  Generated class for the YoutubeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YoutubeProvider {
  apiKey = 'AIzaSyD_n-k_xM5YQ0_qXIlapLsg2mEhpR-SBo8';
  ytURL = 'https://www.googleapis.com/youtube/v3/';
  channelID = 'UCP15FVAA2UL-QOcGhy7-ezA';
  edtallerID = 'PLv6CkzbbGAlX0-_-Ue9I0dlK0EV_9Sp3i';

  constructor(public http: Http) {
  }

  getListVideos(){
    // https://www.googleapis.com/youtube/v3/search?key={your_key_here}&channelId={channel_id_here}&part=snippet,id&order=date&maxResults=20
    return this.http
      .get(this.ytURL + 'search?key='+ this.apiKey
          + '&channelId=' + this.channelID
      + '&part=snippet,id&order=date&maxResults=20')
      .map(res => {
        return res.json()['items'];
      })
  }

  getVideosEDtaller() {
    return this.http
      .get(this.ytURL + 'playlistItems?key=' + this.apiKey
      + '&playlistId=' + this.edtallerID
      + '&part=snippet,id&maxResults=20')
      .map(res => {
        return res.json()['items'];
      })
  }

  getVideo(videoId) {
    return this.http
      .get(this.ytURL + 'videos?key=' + this.apiKey
      + '&id=' + videoId
      + '&part=snippet,id')
      .map(res => {
        return res.json()['items'];
      })
  }

  // getListVideos(listID){
  //   return this.http
  //     .get(this.ytURL + 'playlistItems?key=' + this.apiKey
  //     + '&playlistId=' + listID
  //     + '&part=snippet,id&maxResults=20')
  //     .map(res => {
  //       return res.json()['items'];
  //     })
  // }

  // getListVideosForList(listID) {

  // }

}
