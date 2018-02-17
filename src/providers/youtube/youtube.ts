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
  urlDown = 'https://helloacm.com/api/video/?cached&lang=en&hash=1443b23802e83bb311e5a36af7bd4f3a&video=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D'

  constructor(public http: Http) {
  }

  getListVideos(){
    // https://www.googleapis.com/youtube/v3/search?key={your_key_here}&channelId={channel_id_here}&part=snippet,id&order=date&maxResults=20
    return this.http
      .get(this.ytURL + 'search?key='+ this.apiKey
      + '&channelId=' + this.channelID
      + '&part=snippet,id&order=date')
      .map(res => {
        return res.json();
      })
  }

  getListVideosNextPage(PageToken){
    return this.http
      .get(this.ytURL + 'search?key='+ this.apiKey
      + '&channelId=' + this.channelID
      + '&pageToken=' + PageToken
      + '&part=snippet,id&order=date')
      .map(res => {
        return res.json();
      })
  }

  getVideosEDtaller() {
    return this.http
      .get(this.ytURL + 'playlistItems?key=' + this.apiKey
      + '&playlistId=' + this.edtallerID
      + '&part=snippet,id&order=date&maxResults=9')
      .map(res => {
        return res.json();
      })
  }

  getVideosEDtallerNextPage(PageToken) {
    return this.http
      .get(this.ytURL + 'playlistItems?key=' + this.apiKey
      + '&playlistId=' + this.edtallerID
      + '&pageToken=' + PageToken
      + '&part=snippet,id&order=date')
      .map(res => {
        return res.json();
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

  getVideoDownload(videoId) {
    return this.http
      .get(this.urlDown + videoId)
      .map(res => {
        return res.json();
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
