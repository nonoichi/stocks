import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  public user: firebase.User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController
    ) {
  }

  ngOnInit() {
  }

  logout() {
    firebase.auth().signOut();
  }

  doGoogleLogin(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase.auth().signInWithRedirect(new auth.GoogleAuthProvider());
    });
  }

  isLoggedIn() {
    return (firebase.auth().currentUser == null) ? false : true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  createPinCode() {

    var l = 9;
    var c = "0123456789";
    var cl = c.length;
    var r = "";
    for(var i=0; i<l; i++){
      r += c[Math.floor(Math.random()*cl)];
    }

    var user = firebase.auth().currentUser;
    firebase.database().ref('pincode/' + r).push({
      owner: user.uid
    });

    let alert = this.alertCtrl.create({
      title: '確認コード',
      subTitle: 'この確認コードを、家族のアプリに入力してください。',
      message: r  + '<br>＊入力が終わるまで閉じないで！',
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('OK');
          firebase.database().ref('pincode/' + r).remove();
        }
      }]
    });
    alert.present();
  }

  setPinCode() {
    const confirm = this.alertCtrl.create({
      title: '確認コード入力',
      message: '確認コードを入力してください。',
      inputs: [
        {
          name: '確認コード',
          placeholder: '123456789'
        }
      ],
      buttons: [
        {
          text: 'やめる',
          handler: () => {
            console.log('やめた');
          }
        },
        {
          text: '送信する',
          handler: () => {
            console.log('送信した');
          }
        }
      ]
    });
    confirm.present();
  }
}
