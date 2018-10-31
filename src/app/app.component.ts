import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth'
import { HomePage } from '../pages/home/home';
import { timestamp } from 'rxjs/operators';
// import { environment } from '../environments/environment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage:any = TabsPage;
  rootPage:any = SigninPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private toast: ToastController
    ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Logout', component: null }
    ];
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();

    //   // firebase.initializeApp(environment.firebase);
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(!page.component) {
      this.afAuth.auth.signOut();
      this.nav.setRoot(SigninPage);
      this.toast.create({
        message: 'Logout',
        duration: 3000
      }).present();

      return;
    }

    this.nav.setRoot(page.component);
  }
}
