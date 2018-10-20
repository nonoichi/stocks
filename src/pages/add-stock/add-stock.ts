import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
export class AddStockPage {

  public spaces: string[] = ['れいぞうこ', 'ちょぞうこ', 'れいとうこ'];

  public data: { name: string, space: string } = { name: '', space: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStockPage');
  }

  registStock() {
    console.log('registStock');
    console.log(this.data);

    this.navCtrl.pop();
  }


}
