import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';
import { AddStockPage } from '../add-stock/add-stock';

import { Observable } from 'rxjs/Observable';
import { SigninPage } from '../signin/signin';
import { resolveDefinition } from '@angular/core/src/view/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
// export class HomePage {
export class HomePage {
  talks: Observable<any[]>;

  public user: firebase.User;
  public gid: string;

  public items: string[] = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl: ActionSheetController,
     public afDB: AngularFireDatabase) {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {

      if (!user) {
        // ログインページを表示
        this.navCtrl.setRoot(SigninPage);
        return;
      } else {
        // console.log(user.uid);
      }
    });

    firebase.auth().getRedirectResult()
    .then((result) => {
      if (result.user) {
        let a = firebase.database().ref("users/" + result.user.uid).once('value', (snapshot) => {
          let s = snapshot.val();
          if (!s) {
            let gid = this.insertGroups(result.user.uid);
            this.addGroupUsers(result.user.uid, gid);
            this.insertUsers(result.user.uid, gid);
          }
        });
      }
    })
  }

  insertGroups(uid) {
    return firebase.database().ref('groups').push({
      owner: uid
    }).key;
  }

  addGroupUsers(uid, gid) {
    // グループに所属するユーザを追加
    firebase.database().ref('groups/' + gid + '/children').push({
      uid: uid
    });
  }

  insertUsers(uid, gid) {
    // users テーブルに追加
    firebase.database().ref('users/' + uid + '/' + gid).set({
      isOwner: true
    });
  }

  addStock() {
    this.navCtrl.push('AddStockPage');
  }

  addShoppingList() {
    this.navCtrl.push('AddShoppingListPage');
  }
}
