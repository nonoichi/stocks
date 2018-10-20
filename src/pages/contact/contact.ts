import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AddStockPage } from '../add-stock/add-stock';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public items: string[] = [];

  ngOnInit() {
    // let ref = firebase.database().ref("stocks");
    // ref.once("value")
    //     .then(function (snapshot) {
    //     console.log(snapshot);
    //     // var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
    // });

    firebase.database().ref('stocks/').on('value', resp => {
      if (resp) {
        this.items = [];
        resp.forEach(childSnapshot => {
          const item = childSnapshot.val();
          item.key = childSnapshot.key;
          this.items.push(item);
          console.log(item.key);
        });
      }
    });

  }

  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {

  }

  addStock() {
    this.navCtrl.push('AddStockPage');
  }

  itemSelected(item) {
    const actionSheet = this.actionSheetCtrl.create({
      title: item.name + ' をどうしますか？',
      buttons: [
        {
          text: '空になった',
          handler: () => {
            console.log('空になった');
            firebase.database().ref('stocks/' + item.key).set({
              name: item.name,
              space: item.space,
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
}
