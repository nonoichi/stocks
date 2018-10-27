import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AddStockPage } from '../add-stock/add-stock';

/**
 * Generated class for the StocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html',
})
export class StocksPage {

  searchQuery: string = '';
  public items: string[] = [];
  public filteredItems: string[] = [];

  space: string = "all";

  public
  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {
    this.initializeItems();
  }

  initializeItems() {
    var ref = firebase.database().ref("stocks/");
    ref.orderByChild("usage").equalTo(0).on('value', resp => {
      this.items = [];
      resp.forEach(childSnapshot => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        this.items.push(item);
      });
      this.filteredItems = this.items;
    });
    console.log(this.items);
    // this.items1 = this.items.filter((item) => {
    //   console.log(item);
    //   return item.space === 'れいぞうこ';
    // });
  };

  ngOnInit() {
    // let ref = firebase.database().ref("stocks");
    // ref.once("value")
    //     .then(function (snapshot) {
    //     console.log(snapshot);
    //     // var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
    // });

    // var ref = firebase.database().ref("stocks/");
    // ref.orderByChild("usage").equalTo(0).on('value', resp => {
    //   this.items = [];
    //   resp.forEach(childSnapshot => {
    //     const item = childSnapshot.val();
    //     item.key = childSnapshot.key;
    //     this.items.push(item);
    //   });
    // });

    // firebase.database().ref('stocks/').on('value', resp => {
    //   if (resp) {
    //     this.items = [];
    //     resp.forEach(childSnapshot => {
    //       const item = childSnapshot.val();
    //       item.key = childSnapshot.key;
    //       this.items.push(item);
          console.log(this.items);
    //     });
    //   }
    // });
  }

  addStock() {
    this.navCtrl.push('AddStockPage');
  }

  itemSelected(item) {
    console.log(item.key);
    const actionSheet = this.actionSheetCtrl.create({
      title: item.name + ' をどうしますか？',
      buttons: [
        {
          text: '空になった',
          handler: () => {
            console.log('空になった');
            console.log(item);
            firebase.database().ref('stocks/' + item.key).update({
              // name: item.name,
              // space: item.space,
              usage: 1
            });
          }
        }, {
          text: 'もう買わない',
          // role: 'destructive',
          handler: () => {
            console.log('もう買わない');
            firebase.database().ref('stocks/' + item.key).remove();
          }
        }, {
          text: '内容をかえたい',
          // role: 'destructive',
          handler: () => {
            console.log('内容を変える');
            this.navCtrl.push('AddStockPage');
          }
        }, {
          text: 'なにもしない',
          // role: 'cancel',
          handler: () => {
            console.log('なにもしない');
          }
        }
      ]
    });
    actionSheet.present();
  }

  getItems(ev: any, space: string) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filteredItems = this.filteredItems.filter((item) => {
        // console.log(item.name.indexOf(val));
        // console.log(val);
        // return true;
        if (!space) {
          return item['name'].indexOf(val) > -1;
        } else {
          return item['space'] === space && item['name'].indexOf(val) > -1;
        }
      });
    }
  }

  onSelectChange (space: string) {
    console.log(space);
    if (!space) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter((item) => {
        // console.log(item.name.indexOf(val));
        console.log(item);
        return true;
        // return item.space === space;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StocksPage');
  }

}
