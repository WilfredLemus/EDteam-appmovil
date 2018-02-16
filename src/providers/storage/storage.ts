// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {

  }

  getAll() {
    return this.parseAllItem()
  }

  getAllIDs() {
    return this.storage.keys();
  }

  getID(id) {
    return this.storage.get(id);
  }

  setItem(id, data) {
    return this.storage.set(id, data);
  }

  updateItem(id, data) {
    return this.storage.set(id, data);
  }

  deleteItem(id){
    return this.storage.remove(id);
  }


  parseAllItem() {
    let dataItems: Array<any> = new Array();

    return new Promise((resolve, reject) => {
      this.storage.keys()
      .then(keys => {
        console.log(keys);
        for (let i = 0; i < keys.length; i++) {
          this.getID(keys[i])
          .then(data => {
            // console.log(data);
            dataItems.push(data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
      resolve(dataItems);
    })

  }


  deleteAll(){
    return this.storage.clear();
  }

}
