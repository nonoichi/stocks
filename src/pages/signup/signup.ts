import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  data: { email: string, password: string } = { email: '', password: '' };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController) {
  }

  async signUp() {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.data.email, this.data.password);

      this.navCtrl.setRoot('room');

    } catch (error) {
      const alert = await this.alertController.create({
        // header: '警告',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
