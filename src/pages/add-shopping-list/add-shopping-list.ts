import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { appConfig } from '../../config/app';
import { SigninPage } from '../signin/signin';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AddShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping-list',
  templateUrl: 'add-shopping-list.html',
})
export class AddShoppingListPage {

  addform: FormGroup;

  public categories: string[] = appConfig.categories;
  public spaces: string[] = appConfig.spaces;
  public usages: number[] = appConfig.usages;

  public data: { name: string, space: string, category: string, memo: string } = { name: '', space: '', category: '', memo: '' };

  public user: firebase.User;
  public gid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public afDB: AngularFireDatabase) {
    this.user = firebase.auth().currentUser;
    if (!this.user) this.navCtrl.setRoot(SigninPage);
  }

  /**
   * 初期化処理
   *
   * @memberof AddStockPage
   */
  ngOnInit() {
    this.addform = new FormGroup({
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
  registShoppingList() {
    console.log('アイテムを追加します');

    firebase.database().ref("users/" + this.user.uid)
    .once('value', resp => {
      let g:string = '';
      resp.forEach(childSnapshot => {
        g = childSnapshot.key;
      });
      this.gid = g;

      firebase.database().ref('stocks/' + g).push({
          name: this.addform.value.name,
          space: this.addform.value.space,
          category: this.addform.value.category,
          memo: this.addform.value.memo,
          usage: this.usages[1]
      });
    });

    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingListPage');
  }

}
