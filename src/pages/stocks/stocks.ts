import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { StockInfo } from './model/stock-info';
import { appConfig } from '../../config/app';

import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
import { SigninPage } from '../signin/signin';

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
  public spaces: string[] = appConfig.spaces;

  public user: firebase.User;
  public gid: string;

  public constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public afDB: AngularFireDatabase) {
      this.user = firebase.auth().currentUser;
      if (this.user === null) {
        this.navCtrl.setRoot(SigninPage);
        return;
      }
  }

  /**
   * アイテムを再セット
   *
   * @memberof StocksPage
   */
  initializeItems() {

    firebase.database().ref("users/" + this.user.uid)
    .once('value', resp => {
      let g:string = '';
      resp.forEach(childSnapshot => {
        g = childSnapshot.key;
      });
      this.gid = g;

      console.log("stocks/" + this.gid + "?usage=0");

      this.filteredItems = [];
      firebase.database().ref("stocks/" + this.gid)
      .orderByChild("usage").equalTo(0)
      .on('value', resp2 => {
        this.items = [];
        resp2.forEach(childSnapshot2 => {
          const item = childSnapshot2.val();
          item.key = childSnapshot2.key;
          this.items.push(item);
        });

        if (this.selectedSpace !== this.spaces[0]) {
          this.filteredItems = this.filteredItems.filter((item) => {
            return item.space === this.selectedSpace;
          });
        } else {
          this.filteredItems = this.items;
        }
      });
    });
  }

  /**
   * 初期化処理
   *
   * @memberof StocksPage
   */
  ngOnInit() {
    this.selectedSpace = this.spaces[0];

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
            firebase.database().ref('stocks/' + this.gid + '/' + item.key).update({
              usage: 1
            });
          }
        }, {
          text: 'もう買わない',
          handler: () => {
            console.log('もう買わない');
            firebase.database().ref('stocks/' + this.gid + '/' + item.key).remove();
          }
        }, {
          text: '内容をかえたい',
          handler: () => {
            console.log('内容を変える');
            this.navCtrl.push('EditStockPage', item.key);
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

    if (val && val.trim() != '') {
      this.filteredItems = this.items.filter((item) => {
        if (this.selectedSpace === this.spaces[0]){
          return item.name.indexOf(val) > -1 || item.memo.indexOf(val) > -1;
        } else {
          return item.space === this.selectedSpace && (item.name.indexOf(val) > -1 || item.memo.indexOf(val) > -1);
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

    if (space === this.spaces[0]) {
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
