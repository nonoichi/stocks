import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AddStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-stock',
  templateUrl: 'add-stock.html',
})
export class AddStockPage implements OnInit {

  addform: FormGroup;

  public categories: string[] = ['たべもの', 'にちようひん', 'そのた'];
  public spaces: string[] = ['れいぞうこ', 'ちょぞうこ', 'れいとうこ', 'そのた'];
  public usages: number[] = [0, 1]; // 0:買ったもの、1:買うもの

  public data: { name: string, space: string, category: string, memo: string } = { name: '', space: '', category: '', memo: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  /**
   * 初期化処理
   *
   * @memberof AddStockPage
   */
  ngOnInit() {
    this.addform = new FormGroup({
      // name: new FormControl('', [Validators.required,
      //   Validators.pattern('[a-zA-Z ]*'), Validators.minLength(0), Validators.maxLength(50)]),
      name: new FormControl('', [Validators.required]),
      space: new FormControl('', []),
      category: new FormControl('', []),
      memo: new FormControl('', []),
      usage: new FormControl('', []),
    });
  }

  /**
   * アイテム追加
   *
   * @memberof AddStockPage
   */
  registStock() {
    console.log('アイテムを追加します');

    firebase.database().ref('stocks/').push({
        name: this.addform.value.name,
        space: this.addform.value.space,
        category: this.addform.value.category,
        memo: this.addform.value.memo,
        usage: this.usages[0]
    });

    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStockPage');
  }
}
