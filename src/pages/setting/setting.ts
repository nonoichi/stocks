import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';
import { SigninPage } from '../signin/signin';

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
  public items: string[];
  public flg: boolean = true;
  gid = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController
    ) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // 匿名ユーザでログイン済み
          this.user = firebase.auth().currentUser;
          console.log(this.user);
        } else {
          // 未ログインのため、初期画面へ遷移
          this.navCtrl.setRoot(SigninPage);
          return;
        }
      });
  }

  ngOnInit() {
  }

  logout() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('sign out successfull');
    }).catch(function(error) {
      // An error happened.
      console.log('sign out failded');
    });
    this.navCtrl.setRoot(SigninPage);
  }

  doGoogleLogin(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase.auth().signInWithRedirect(new auth.GoogleAuthProvider());
    });
  }


  isLoggedIn() {
    if (!this.user) return;
    // console.log((this.user == null || this.user.isAnonymous));
    // 未ログインか匿名ユーザでログインしている場合
    return (this.user == null || this.user.isAnonymous) ? false : true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  /**
   * ハッシュ発行処理
   */
  createHash() {
    var l = 1;
    var c = "0123456789";
    var cl = c.length;
    var r = "";
    for(var i=0; i<l; i++){
      r += c[Math.floor(Math.random()*cl)];
    }
    return r;
  }

  /**
   * ピンコード発行
   */
  createPinCode() {

    // ハッシュコード発行
    var hash = this.createHash();

    // グループID 取得
    firebase.database().ref('groups/')
    .orderByChild("owner").equalTo(this.user.uid).once('value', resp => {
      if (resp) {
        resp.forEach(childSnapshot => {
          const g = childSnapshot.val(); // オーナーID含む
          g.key = childSnapshot.key; // グループID
          this.gid.push(g.key);

          // pincode テーブルに追加
          firebase.database().ref('pincode/' + this.gid[0]).remove();
          firebase.database().ref('pincode/' + this.gid[0]).set({
            hash: hash
          });
        });
      }
    });

    let alert = this.alertCtrl.create({
      title: '確認コード',
      subTitle: 'この確認コードを、家族のアプリに入力してください。',
      message: hash  + '<br>＊入力が終わるまで閉じないで！',
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('OK');
          firebase.database().ref('pincode/' + hash).remove();
        }
      }]
    });
    alert.present();
  }

  isConnected() {

    if (!this.user) return;

    // this.flg = true;
    firebase.database().ref("groups/" + this.user.uid)
    .once('value',function(snapshot) {
      // console.log(snapshot.val());
      if (snapshot.val() == null) {
        // console.log(snapshot.val());
        this.flg = false;
      }

    });
    // this.flg = false;
    if (this.flg != false) {
      this.flg = true;
    } else {
      this.flg = false;
    }
    console.log(this.flg);
    return this.flg;
  }

  disconnect() {
    if (!this.user) return;

    console.log('連携解除');
    firebase.database().ref('groups/' + this.user.uid).remove();
  }

  setPinCode() {
    if (!this.user) return;

    const confirm = this.alertCtrl.create({
      title: '確認コード入力',
      message: '確認コードを入力してください。',
      inputs: [
        {
          name: 'pincode',
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
          handler: (data) => {
            console.log('送信した');
            console.log(data.pincode);

            // ピンコード同一確認
            firebase.database().ref('pincode/')
            .orderByChild("hash").equalTo(data.pincode).once('value', resp => {
              if (resp) {
                resp.forEach(childSnapshot => {

                  // 現在のグループを削除
                  firebase.database().ref("groups/")
                  .orderByChild("owner").equalTo(this.user.uid).once('value', resp2 => {
                    if (resp2) {
                      resp2.forEach(childSnapshot2 => {
                        firebase.database().ref('groups/' + childSnapshot2.key).remove();
                      });
                    }
                  });

                  // 新グループに所属変更
                  firebase.database().ref("users/" + this.user.uid).remove();
                  firebase.database().ref("users/" + this.user.uid + '/' + childSnapshot.key).set({
                    isOwner: false
                  });

                  // 新グループに属するユーザリストに追加
                  firebase.database().ref('groups/' + childSnapshot.key + '/children').push({
                    uid: this.user.uid
                  });
                });
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
