import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { appConfig } from '../../config/app';
import { SigninPage } from '../signin/signin';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase } from 'angularfire2/database';

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

  public item_key: string;
  public user: firebase.User;
  public gid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public afDB: AngularFireDatabase) {
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

    firebase.database().ref("users/" + this.user.uid)
    .once('value', resp => {
      let g:string = '';
      resp.forEach(childSnapshot => {
        g = childSnapshot.key;
      });
      this.gid = g;

      firebase.database().ref('stocks/' +  g + '/' + this.item_key).once('value', resp => {
        this.form['name'] = resp.val().name;
        this.form['category'] = resp.val().category;
        this.form['space'] = resp.val().space;
        this.form['memo'] = resp.val().memo;
        this.form['usage'] = resp.val().usage;
      });
    });
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShoppingListPage');
  }

  updateShoppingList() {
    console.log('update shopping list data.');

    firebase.database().ref('stocks/' + this.gid + '/' + this.item_key).update({
      name: this.editform.value.name,
      space: this.editform.value.space,
      category: this.editform.value.category,
      memo: this.editform.value.memo
    });

    this.navCtrl.pop();
  }

}
