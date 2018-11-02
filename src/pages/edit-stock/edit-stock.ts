import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { appConfig } from '../../config/app';
import { SigninPage } from '../signin/signin';
import { TabsPage } from '../tabs/tabs';

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

  public categories: string[] = appConfig.categories;
  public spaces: string[] = appConfig.spaces;
  public usages: number[] = appConfig.usages;

  public form: string[] = [];

  public data: { name: string, space: string, category: string, memo: string } = { name: '', space: '', category: '', memo: '' };

  private item_key = "";
  public user: firebase.User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.user = firebase.auth().currentUser;
    if (!this.user) this.navCtrl.setRoot(SigninPage);

    this.initializeItem(navParams.data);
  }

  initializeItem(p) {
    if (p.length === undefined) {
      this.navCtrl.setRoot(TabsPage);
    } else {
      this.item_key = p;
    }

    this.editform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      space: new FormControl('', []),
      category: new FormControl('', []),
      memo: new FormControl('', []),
      usage: new FormControl('', []),
    });

    firebase.database().ref('stocks/' +  this.user.uid + '/' + this.item_key).once('value', resp => {
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

    firebase.database().ref('stocks/' + this.user.uid + '/' + this.item_key).update({
      name: this.editform.value.name,
      space: this.editform.value.space,
      category: this.editform.value.category,
      memo: this.editform.value.memo
    });

    this.navCtrl.pop();
  }

}
