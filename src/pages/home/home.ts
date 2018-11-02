import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AddStockPage } from '../add-stock/add-stock';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
// export class HomePage {
export class HomePage {
  talks: Observable<any[]>;

  public items: string[] = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl: ActionSheetController,
     public afDB: AngularFireDatabase) {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // 初期ページを表示
        this.navCtrl.setRoot(SigninPage);
        return;
      }
    });

    this.items = [];
    firebase.database().ref("stocks")
    .orderByChild("usage").equalTo(0)
    .on('value', resp => {
      this.items = [];
      resp.forEach(childSnapshot => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
      });
    });
  }

  addStock() {
    this.navCtrl.push('AddStockPage');
  }
}
