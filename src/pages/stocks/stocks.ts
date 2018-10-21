import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AddStockPage } from '../add-stock/add-stock';

/**
 * Generated class for the StocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html',
})
export class StocksPage {

  public items: string[] = [];

  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {

  }

  ngOnInit() {
    // let ref = firebase.database().ref("stocks");
    // ref.once("value")
    //     .then(function (snapshot) {
    //     console.log(snapshot);
    //     // var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
    // });

    var ref = firebase.database().ref("stocks/");
    ref.orderByChild("usage").equalTo(0).on('value', resp => {
      this.items = [];
      resp.forEach(childSnapshot => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        this.items.push(item);
      });
    });

    // firebase.database().ref('stocks/').on('value', resp => {
    //   if (resp) {
    //     this.items = [];
    //     resp.forEach(childSnapshot => {
    //       const item = childSnapshot.val();
    //       item.key = childSnapshot.key;
    //       this.items.push(item);
          console.log(this.items);
    //     });
    //   }
    // });
  }

  addStock() {
    this.navCtrl.push('AddStockPage');
  }

  itemSelected(item) {
    console.log(item.key);
    const actionSheet = this.actionSheetCtrl.create({
      title: item.name + ' をどうしますか？',
      buttons: [
        {
          text: '空になった',
          handler: () => {
            console.log('空になった');
            console.log(item);
            firebase.database().ref('stocks/' + item.key).update({
              // name: item.name,
              // space: item.space,
              usage: 1
            });
          }
        }, {
          text: 'もう買わない',
          // role: 'destructive',
          handler: () => {
            console.log('もう買わない');
            firebase.database().ref('stocks/' + item.key).remove();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad StocksPage');
  }

}
