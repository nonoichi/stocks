import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public items: string[] = [];

  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {

  }

  ngOnInit() {

    // var ref = firebase.database().ref("stocks/");
    // ref.orderByChild("usage").equalTo(9).equalTo(9),on('value', resp => {
    //   this.items = [];
    //   resp.forEach(childSnapshot => {
    //     const item = childSnapshot.val();
    //     item.key = childSnapshot.key;
    //     this.items.push(item);
    //   });
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
