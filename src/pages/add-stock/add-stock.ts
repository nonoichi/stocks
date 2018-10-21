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
  public spaces: string[] = ['れいぞうこ', 'ちょぞうこ', 'れいとうこ'];

  public data: { name: string, space: string, category: string, memo: string } = { name: '', space: '', category: '', memo: '' };
  // public name: string = '';
  // public space: string = '';
  // public memo: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.addform = new FormGroup({
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
    console.log('ionViewDidLoad AddStockPage');
  }

  registStock() {
    console.log('registStock');
    console.log(this.addform.value);

    firebase.database().ref('stocks/').push({
        name: this.addform.value.name,
        space: this.addform.value.space,
        category: this.addform.value.category,
        memo: this.addform.value.memo,
        usage: 0
    });

    this.navCtrl.pop();
  }


}
