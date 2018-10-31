import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { appConfig } from '../../config/app';

/**
 * Generated class for the EditShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-list',
  templateUrl: 'edit-shopping-list.html',
})
export class EditShoppingListPage implements OnInit {

  editform: FormGroup;

  public categories: string[] = appConfig.categories;
  public spaces: string[] = appConfig.spaces;
  public usages: number[] = appConfig.usages;

  public form: string[] = [];

  public data: { name: string, space: string, category: string, memo: string } = { name: '', space: '', category: '', memo: '' };

  private item_key = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItem(navParams.data);
  }

  initializeItem(p) {
    if (p.length === undefined) {
      // かうものリストへもどる
      // this.navCtrl.setRoot('shopping-list');
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
    console.log('ionViewDidLoad EditShoppingListPage');
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
