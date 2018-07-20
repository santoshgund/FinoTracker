import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberPassbookPage } from './member-passbook';

@NgModule({
  declarations: [
    MemberPassbookPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberPassbookPage),
  ],
})
export class MemberPassbookPageModule {}
