import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the EditStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-stock',
  templateUrl: 'edit-stock.html',
})

export class EditStockPage implements OnInit {

  editform: FormGroup;

  public categories: string[] = ['たべもの', 'にちようひん', 'そのた'];
  public spaces: string[] = ['れいぞうこ', 'ちょぞうこ', 'れいとうこ', 'そのた'];
  public usages: number[] = [0, 1]; // 0:買ったもの、1:買うもの

  public form: string[] = [];

  public data: { name: string, space: string, category: string, memo: string } = { name: '', space: '', category: '', memo: '' };

  private item_key = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItem(navParams.data);
  }

  initializeItem(p) {
    if (p.length === undefined) {
      // かったものリストへもどる
      // this.navCtrl.setRoot('stocks');
    } else {
      this.item_key = p;
    }

    this.editform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      space: new FormControl('', []),
      category: new FormControl('', []),
      memo: new FormControl('', []),
      // usage: new FormControl('', []),
    });

    firebase.database().ref('stocks/' + this.item_key).once('value', resp => {
      this.form['name'] = resp.val().name;
      this.form['category'] = resp.val().category;
      this.form['space'] = resp.val().space;
      this.form['memo'] = resp.val().memo;
      this.form['usage'] = resp.val().usage;
    });
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditStockPage');
  }

  updateStock() {
    console.log('update stock data.');

    firebase.database().ref('stocks/' + this.item_key).update({
      name: this.editform.value.name,
      space: this.editform.value.space,
      category: this.editform.value.category,
      memo: this.editform.value.memo
    });

    this.navCtrl.pop();
  }

}
