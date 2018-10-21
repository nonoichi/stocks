import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  public spaces: string[] = ['れいぞうこ', 'ちょぞうこ', 'れいとうこ'];

  public data: { name: string, space: string } = { name: '', space: '' };
  public name: string = '';
  public space: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.addform = new FormGroup({
      // name: new FormControl('', [Validators.required,
      //   Validators.pattern('[a-zA-Z ]*'), Validators.minLength(0), Validators.maxLength(50)]),
      name: new FormControl('', [Validators.required]),
      space: new FormControl('', []),
      // usage: new FormControl('', []),
    });
  }

  registShoppingList() {
    console.log('registShoppingList');
    console.log(this.addform.value);

    firebase.database().ref('stocks/').push({
      name: this.addform.value.name,
      space: this.addform.value.space,
      usage: 1
    });

    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingListPage');
  }

}
