import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {MemberPassbookPage} from '../member-passbook/member-passbook';
import { MembersPage } from '../members/members';


@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = MembersPage;
  tab3Root: any = MemberPassbookPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    
  }

}
