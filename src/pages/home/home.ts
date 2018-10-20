import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: string[] = ['キャベツ', 'りんご', 'みかん', 'ピーマン'];

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {

  }

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
