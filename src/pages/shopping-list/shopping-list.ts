import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
// import { AddShoppingListPage } from '../add-shopping-list/add-shopping-list';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  public items: string[] = [];

  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {

  }

  ngOnInit() {
    var ref = firebase.database().ref("stocks/");
    ref.orderByChild("usage").equalTo(1).on('value', resp => {
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
    //       console.log(item.key);
    //     });
    //   }
    // });
  }

  addShoppingList() {
    this.navCtrl.push('AddShoppingList');
  }

  itemSelected(item) {
    const actionSheet = this.actionSheetCtrl.create({
      title: item.name + ' をどうしますか？',
      buttons: [
        {
          text: '買った',
          handler: () => {
            console.log('買った');
            firebase.database().ref('stocks/' + item.key).update({
              // name: item.name,
              // space: item.space,
              usage: 0
            });
          }
        }, {
          text: 'りれきが見たい',
          handler: () => {
            console.log('りれきが見たい');
            this.navCtrl.push('History');
          }
        }, {
          text: 'もう買わない',
          handler: () => {
            console.log('もう買わない');
            firebase.database().ref('stocks/' + item.key).remove();
          }
        }, {
          text: 'なにもしない',
          handler: () => {
            console.log('なにもしない');
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

}
