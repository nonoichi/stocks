import { Component, TestabilityRegistry } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../../model/user';
import { TabsPage } from '../tabs/tabs';
import { StocksPage } from '../stocks/stocks';

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

  user = {} as User;

  data: { email: string, password: string } = { email: '', password: '' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    public alertController: AlertController) {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 匿名ユーザでログイン済みのため、ページ遷移
        this.navCtrl.setRoot(TabsPage);
        return;
      } else {
        // 初期ページを表示
      }
    });
  }

  /**
   * 初期化処理
   *
   * @memberof StocksPage
   */
  ngOnInit() {
  }

  async signIn(user: User) {
    this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email, user.password)
    .then(res => {
      if (res.user.email && res.user.uid) {
        this.navCtrl.setRoot(TabsPage);

        this.toast.create({
          message: 'Welcome to APP_NAME',
          duration: 3000
        }).present();
      } else {
        this.toast.create({
          message: 'Could no find authentication details.',
          duration: 3000
        }).present();
      }
    })
    .catch(err => {
      this.toast.create({
        message: 'Login Id and Password do not match',
        duration: 3000
      }).present();
    })
  }

  guest() {
    firebase.auth().signInAnonymously().catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log(user);

        this.navCtrl.setRoot(TabsPage);
        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });

    // var credential = firebase.auth.EmailAuthProvider.credential(email, password);

    // firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(function(usercred) {
    //   var user = usercred.user;
    //   console.log("Anonymous account successfully upgraded", user);
    // }, function(error) {
    //   console.log("Error upgrading anonymous account", error);
    // });
  }

  signUp() {
    this.navCtrl.push('signup');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
