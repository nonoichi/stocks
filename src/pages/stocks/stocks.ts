import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AddStockPage } from '../add-stock/add-stock';
import { StockInfo } from './model/stock-info';

/**
 * Generated class for the StocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/**
 *
 *
 * @export
 * @class StocksPage
 */
@IonicPage()
@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html',
})

export class StocksPage {

  // 全商品リスト
  public items: StockInfo[] = [];
  // 商品リスト
  public filteredItems: StockInfo[];
  // 選択中のタブ情報
  public selectedSpace: string;
  // 置き場マスタ
  public spaceList: string[] = ['すべて', 'れいぞうこ', 'ちょぞうこ', 'れいとうこ', 'そのた'];

  public constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {
  }

  /**
   * アイテムを再セット
   *
   * @memberof StocksPage
   */
  initializeItems() {
    this.filteredItems = [];
    firebase.database().ref("stocks")
    .orderByChild("usage").equalTo(0)
    .on('value', resp => {
      this.items = [];
      resp.forEach(childSnapshot => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        this.items.push(item);
      });
      if (this.selectedSpace !== 'すべて') {
        this.filteredItems = this.filteredItems.filter((item) => {
          return item.space === this.selectedSpace;
        });
      } else {
        this.filteredItems = this.items;
      }
    });
  }

  /**
   * 初期化処理
   *
   * @memberof StocksPage
   */
  ngOnInit() {
    this.selectedSpace = 'すべて';

    this.initializeItems();
  }

  /**
   * アイテム追加
   *
   * @memberof StocksPage
   */
  addStock() {
    this.navCtrl.push('AddStockPage');
  }

  /**
   * アイテム選択
   *
   * @param {*} item
   * @memberof StocksPage
   */
  itemSelected(item) {
    const actionSheet = this.actionSheetCtrl.create({
      title: item.name + ' をどうしますか？',
      buttons: [
        {
          text: '空になった',
          handler: () => {
            console.log('空になった');
            console.log(item);
            firebase.database().ref('stocks/' + item.key).update({
              usage: 1
            });
          }
        }, {
          text: 'もう買わない',
          handler: () => {
            console.log('もう買わない');
            firebase.database().ref('stocks/' + item.key).remove();
          }
        }, {
          text: '内容をかえたい',
          handler: () => {
            console.log('内容を変える');
            this.navCtrl.push('EditStockPage', 1);
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

  /**
   * キーワード検索
   *
   * @param {*} ev
   * @memberof StocksPage
   */
  getItems(ev: any) {
    const val = ev.target.value;

    console.log(val + 'で絞り込みを行います');

    this.initializeItems();

    if (val && val.trim() != '') {
      this.filteredItems = this.items.filter((item) => {
        if (this.selectedSpace === 'すべて'){
          return item.name.indexOf(val) > -1;
        } else {
          return item.space === this.selectedSpace && item.name.indexOf(val) > -1;
        }
      });
    }
  }

  /**
   * 置き場タブ選択
   *
   * @param {string} space
   * @memberof StocksPage
   */
  onSelectChange (space: string) {
    console.log(space + 'のタブがクリックされました');
    this.selectedSpace = space;

    if (space === 'すべて') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter((item) => {
        return item.space === this.selectedSpace;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StocksPage');
  }

}
