import { Component, ViewChild } from '@angular/core';
import { NavController, Refresher, ToastController, ModalController } from 'ionic-angular';
import { Searchbar } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { MemberData } from '../../providers/member-data';
import { MemberDetailsPage } from '../member-details/member-details'
import { MemberCreatePage } from '../member-create/member-create'
@Component({
  selector: 'members',
  templateUrl: 'members.html'
})

export class MembersPage {
  membersData: any;
  availableMemberList: any;

  @ViewChild('mySearchbar') searchbar: Searchbar;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public memberService: MemberData,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) { }

  initilizeData() {
    this.memberService.getMembers().then((data) => {
      this.membersData = data;
      this.availableMemberList = data;
    });
  }

  ionViewDidLoad() {
    this.initilizeData();
  }


  goToMemberDetail(memberData: any) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(MemberDetailsPage, { memberData: memberData });
  }

  deleteMember() {

  }
  searchMember(ev: any) {

    // Reset items back to all of the items
    this.membersData = this.availableMemberList;
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.membersData = this.membersData.filter((item) => {
        return (item.memberName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  doRefresh(refresher: Refresher) {
    this.initilizeData();


    // simulate a network request that would take longer
    // than just pulling from out local json file
    setTimeout(() => {
      refresher.complete();

      const toast = this.toastCtrl.create({
        message: 'Data have been updated.',
        duration: 3000
      });
      toast.present();
    }, 1000);
  }

  addMember() {
    let addModal = this.modalCtrl.create(MemberCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.membersData.push(item);
        let member = {
          memberId: item.memberId,
          memberName: item.memberName,
          contactNumber: item.contactNumber,
          accountnumber: item.accountnumber,
          bankBranch: item.bankBranch,
          ifscCode: item.ifscCode,
          phonePayNumner: item.phonePayNumner,
          chequeNumber: item.chequeNumber,
          emailAddress: item.emailAddress,
          isAdmin: false,
          profilePic: item.profilePic
        };
        this.memberService.saveMember(member);
      }
    })
    addModal.present();
  }
}
