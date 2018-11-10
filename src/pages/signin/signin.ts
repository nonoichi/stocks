import { Component, TestabilityRegistry } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, SelectPopover } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

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
        // ログイン済みのため、ページ遷移
        this.navCtrl.setRoot(TabsPage);
        return;
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

  // async signIn(user: User) {
  //   this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email, user.password)
  //   .then(res => {
  //     if (res.user.email && res.user.uid) {
  //       this.navCtrl.setRoot(TabsPage);

  //       this.toast.create({
  //         message: 'Welcome to APP_NAME',
  //         duration: 3000
  //       }).present();
  //     } else {
  //       this.toast.create({
  //         message: 'Could no find authentication details.',
  //         duration: 3000
  //       }).present();
  //     }
  //   })
  //   .catch(err => {
  //     this.toast.create({
  //       message: 'Login Id and Password do not match',
  //       duration: 3000
  //     }).present();
  //   })
  // }

  doGoogleLogin(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // console.log('a');
      return firebase.auth().signInWithRedirect(new auth.GoogleAuthProvider());
      // return firebase.auth().signInWithPopup(new auth.GoogleAuthProvider());
    })
    .then(() => {
      // console.log('b');
      // let user = firebase.auth().currentUser;
      // while(!user) {

      // }
      // const asyncAwait = async () => {
      //   const aa1 = await asyncAwait1(0)
      //   const aa2 = await asyncAwait2(aa1)
      //   const aa3 = await asyncAwait3(aa2)
      //   const sum = aa3
      //   console.log(aa3);
      // }

      // const asyncAwait1 = async (num) => {
      //   return await num + 1
      // }

      // const asyncAwait2 = async (num) => {
      //     return await num + 2
      // }

      // const asyncAwait3 = async (num) => {
      //     return await num + 3
      // }

      // asyncAwait().catch(error => { console.log(error) });
    });
  }

  /**
   * 匿名ユーザでログイン
   *
   * @memberof SigninPage
   */
  // guest() {
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //   .then(() => {

  //     firebase.auth().signInAnonymously().catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //     });

  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         var isAnonymous = user.isAnonymous;
  //         var uid = user.uid;
  //         console.log('匿名ユーザでログインしました');
  //         console.log(user);
  //         this.navCtrl.setRoot(TabsPage);
  //       } else {
  //       }
  //     });
  //   });
  // }

  // signUp() {
  //   this.navCtrl.push('signup');
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
