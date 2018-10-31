import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AddStockPage } from '../add-stock/add-stock';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
// export class HomePage {
export class HomePage {
  talks: Observable<any[]>;

  // public items: string[] = ['キャベツ', 'りんご', 'みかん', 'ピーマン'];
  public items: string[] = [];

  // constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl: ActionSheetController,
     public afDB: AngularFireDatabase
     ) {
      this.items = [];
      firebase.database().ref("stocks")
      .orderByChild("usage").equalTo(0)
      .on('value', resp => {
        this.items = [];
        resp.forEach(childSnapshot => {
          const item = childSnapshot.val();
          item.key = childSnapshot.key;
          console.log(item);
          // this.items.push(item);
        });
        // if (this.selectedSpace !== 'すべて') {
        //   this.filteredItems = this.filteredItems.filter((item) => {
        //     return item.space === this.selectedSpace;
        //   });
        // } else {
        //   this.filteredItems = this.items;
        // }
      });

      // this.talks = afDB.list('/stocks').valueChanges();
      // console.log(this.talks);
  }

  // ngOnInit() {
  //   console.log('aa');

  //   // var ref = firebase.database().ref("stocks");
  //   // ref.once("value")
  //   //   .then(function (snapshot) {
  //   //     console.log(snapshot);
  //   //     // var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}

  //   // });
  //   // firebase.database().ref('stocks/').on('value', resp => {
  //   //   console.log(resp);
  //   //   // if (resp) {
  //   //   //   this.items = [];
  //   //   //   resp.forEach(childSnapshot => {
  //   //   //     const item = childSnapshot.val();
  //   //   //     item.key = childSnapshot.key;
  //   //   //     this.items.push(item);
  //   //   //   });
  //   //   // }
  //   // });
  // }

  addStock() {
    this.navCtrl.push('AddStockPage');
  }

  itemSelected(item) {
    const actionSheet = this.actionSheetCtrl.create({
      title: item + ' をどうしますか？',
      buttons: [
        {
          text: '空になった',
          handler: () => {
            console.log('空になった');

          }
        }, {
          text: 'もう買わない',
          // role: 'destructive',
          handler: () => {
            console.log('もう買わない');
          }
        }, {
          text: '内容をかえたい',
          // role: 'destructive',
          handler: () => {
            console.log('内容を変える');
            this.navCtrl.push('AddStockPage');
          }
        }, {
          text: 'なにもしない',
          // role: 'cancel',
          handler: () => {
            console.log('なにもしない');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
