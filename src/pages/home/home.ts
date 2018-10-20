import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  addStock() {
    this.navCtrl.push('AddStockPage');
  }
}
