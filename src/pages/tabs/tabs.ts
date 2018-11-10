import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContaCctPage } from '../contact/contact';
import { StocksPage } from '../stocks/stocks';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';
import { RoomPage } from '../room/room';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  // tab1Root = StocksPage;
  // tab2Root = ShoppingListPage;
  // tab1Root = HomePage;
  // tab1Root = RoomPage;
  tab2Root = StocksPage;
  tab3Root = ShoppingListPage;
  tab4Root = SettingPage;

  constructor() {
  }
}
