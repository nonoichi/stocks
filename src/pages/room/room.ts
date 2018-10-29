import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('a');
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
        this.navCtrl.setRoot('signin');
      }
    });
  }

  async signOut() {
    try {
      await firebase.auth().signOut();
      this.navCtrl.setRoot('signin');

    } catch (error) {}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

}
