import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { ConferenceApp } from './app.component';

// import { AboutPage } from '../pages/about/about';
// import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
// import { MapPage } from '../pages/map/map';
// import { SchedulePage } from '../pages/schedule/schedule';
// import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
// import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
// import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
// import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { MemberDetailsPage } from '../pages/member-details/member-details';
import { MembersPage } from '../pages/members/members';
import { MemberCreatePage } from '../pages/member-create/member-create';
import { EditProfilePage } from '../pages/member-details/edit-profile/edit-profile';
import { EditProfilePopoverPage } from '../pages/member-details/edit-profile-popover/edit-profile-popover';
import { HomePage } from '../pages/home/home';

 import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { MemberData } from '../providers/member-data';
import { MemberPassbookPage } from "../pages/member-passbook/member-passbook";
import{AddPassbookPage} from "../pages/member-passbook/add-passbook/add-passbook"


@NgModule({
  declarations: [
    ConferenceApp,
    // AboutPage,
    AccountPage,
    LoginPage,
    // MapPage,
    // PopoverPage,
    // SchedulePage,
    // ScheduleFilterPage,
    // SessionDetailPage,
    SignupPage,
    // SpeakerDetailPage,
    // SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    MemberDetailsPage,
    MembersPage,
    MemberCreatePage,
    EditProfilePage,
    EditProfilePopoverPage,
    HomePage,
    MemberPassbookPage,
    AddPassbookPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        // { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        // { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        // { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        // { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        // { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        // { component: MapPage, name: 'Map', segment: 'map' },
        // { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: MemberDetailsPage, name: 'MemberDetailsPage', segment: 'memberDetails' },
        { component: MembersPage, name: 'MembersPage', segment: 'membersList' },
        { component: MemberCreatePage, name: 'MembersCreatePage', segment: 'membersCreate' },
        { component: EditProfilePage, name: 'EditProfilePage', segment: 'editPrifile' },
        { component: HomePage, name: 'HomePage', segment: 'homePage' },
        { component: MemberPassbookPage, name: 'MemberPassbookPage', segment: 'passbook' },
        { component: AddPassbookPage, name: 'AddPassbookPage', segment: 'addPassbook' }
        

      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    //AboutPage,
    AccountPage,
    LoginPage,
    // MapPage,
    // PopoverPage,
    // SchedulePage,
    // ScheduleFilterPage,
    // SessionDetailPage,
    SignupPage,
    // SpeakerDetailPage,
    // SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    MemberDetailsPage,
    MembersPage,
    MemberCreatePage,
    EditProfilePage,
    EditProfilePopoverPage,
    HomePage,
    MemberPassbookPage,
    AddPassbookPage

  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    MemberData,
    InAppBrowser,
    SplashScreen,
    Camera,
    ImagePicker,
    Crop
  ]
})
export class AppModule { }
