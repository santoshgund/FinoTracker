import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { MemberData } from '../../providers/member-data';
import { EditProfilePage } from './edit-profile/edit-profile'

@Component({
  selector: 'member-details',
  templateUrl: 'member-details.html'
})
export class MemberDetailsPage {
  memberDetails: any;
  dataFromOtherPage = null;

  constructor(
    public navParams: NavParams,
    public memberService: MemberData,
    public navCtrl: NavController,
  ) { }

  ionViewWillEnter() {
    this.memberDetails = this.navParams.data.memberData;
  }


  callback = data => {
    
    if (this.memberDetails.profilePic !== data)
    {
      this.memberDetails.profilePic = data;
      this.memberService.updateMember(this.memberDetails);      
    }
  };

  editProfilePicture() {
    this.navCtrl.push(EditProfilePage, { profilePic: this.memberDetails.profilePic, callback: this.callback });
  }
}
