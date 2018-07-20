import { Component, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavParams, IonicPage, PopoverController, Platform, ActionSheetController, AlertController } from 'ionic-angular';
import { MemberData } from '../../../providers/member-data';
import { EditProfilePopoverPage } from '../edit-profile-popover/edit-profile-popover'

@IonicPage()
@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  @ViewChild('fileInput') fileInput;


  profilePic: any;

  constructor(
    public navParams: NavParams,
    public memberService: MemberData,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public camera: Camera,
    public alerCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.profilePic = this.navParams.data.profilePic;
  }

  ionViewWillLeave() {
    this.navParams.get('callback')(this.profilePic);
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(EditProfilePopoverPage);
    popover.present({ ev: event });
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      //title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.doConfirm();
          }
        },
        {
          text: 'Take Photo',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {

            this.takePhoto(1);
          }
        },
        {
          text: 'Choose Photo',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {

            this.takePhoto(0);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  doConfirm() {
    let confirm = this.alerCtrl.create({
      title: 'Delete Photo?',
      message: 'Do you agree to delete this profile picture?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.profilePic="";
          }
        }
      ]
    });
    confirm.present()
  }

  //take Photo
  takePhoto(sourceType: number) {
    if (Camera['installed']()) {
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: sourceType,
      }

      this.camera.getPicture(options).then((imageData) => {
        this.profilePic = 'data:image/jpeg;base64,' + imageData;
      }, () => {
        // Handle error
      });
    }
    else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      this.profilePic = (readerEvent.target as any).result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}

