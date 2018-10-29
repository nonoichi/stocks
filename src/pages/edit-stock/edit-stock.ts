import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
export class EditStockPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    console.log(this.navParams);
	// this.urlParamID = navParams.get('1').value;
    // console.log(event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditStockPage');
  }

}
