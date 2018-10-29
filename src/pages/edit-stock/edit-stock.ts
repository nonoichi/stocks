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
  public spaces: string[] = ['れいぞうこ', 'ちょぞうこ', 'れいとうこ'];

  public data: { name: string, space: string, category: string, memo: string } = { name: '', space: '', category: '', memo: '' };
  // public name: string = '';
  // public space: string = '';
  // public memo: string = '';
  public item: string[] = [];
  private item_key = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item_key = navParams.data;
    console.log(this.item_key);
    this.initializeItem();
  }

  initializeItem() {
    var ref = firebase.database().ref("stocks/");
    ref. child(this.item_key).on('value', resp => {
      this.item = [];
      resp.forEach(childSnapshot => {
        const item = childSnapshot.val();
        this.item.push(item);
      });
    });
    console.log(this.item);
  };

  ngOnInit() {
    this.editform = new FormGroup({
      // name: new FormControl('', [Validators.required,
      //   Validators.pattern('[a-zA-Z ]*'), Validators.minLength(0), Validators.maxLength(50)]),
      name: new FormControl('', [Validators.required]),
      space: new FormControl('', []),
      category: new FormControl('', []),
      memo: new FormControl('', []),
      // usage: new FormControl('', []),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditStockPage');
  }

  registStock() {
    console.log('registStock');
    console.log(this.editform.value);

    firebase.database().ref('stocks/').push({
        name: this.editform.value.name,
        space: this.editform.value.space,
        category: this.editform.value.category,
        memo: this.editform.value.memo,
        usage: 0
    });
  }

}
