import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { StocksPage } from '../pages/stocks/stocks';
// import { AddStockPage } from '../pages/add-stock/add-stock';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { SettingPage } from '../pages/setting/setting';
import { RoomPage } from '../pages/room/room';
import { SigninPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    StocksPage,
    // AddStockPage,
    ShoppingListPage,
    SettingPage,
    RoomPage,
    SigninPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    StocksPage,
    // AddStockPage,
    ShoppingListPage,
    SettingPage,
    RoomPage,
    SigninPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
