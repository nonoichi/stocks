import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  data: { email: string, password: string } = { email: '', password: '' };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController) {
  }

  async signIn() {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.data.email, this.data.password);

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

  signUp() {
    this.navCtrl.push('signup');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
