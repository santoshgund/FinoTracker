import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

import { MemberData } from '../../providers/member-data';

@IonicPage()
@Component({
    selector: 'member-create',
    templateUrl: 'member-create.html'
})
export class MemberCreatePage {
    @ViewChild('fileInput') fileInput;

    isReadyToSave: boolean;

    item: any;

    form: FormGroup;
    isDisabled = true;
    isReadonly = false;
    nextMemberId: any;
    photos:any;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public formBuilder: FormBuilder,
        public camera: Camera,
        public imagePicker: ImagePicker,
        public cropService:Crop,
        public memberService: MemberData) {


    }

    ionViewWillEnter() {
        this.getNextMemberId();
    }

    getNextMemberId() {
        this.memberService.getNextMemberId().then((data) => {
            this.nextMemberId = data.length;
            this.isReadonly = this.nextMemberId > 0 ? true : false

        });

        this.form = this.formBuilder.group({
            profilePic: [''],
            memberName: ['', Validators.required],
            memberId: ['FV' + this.nextMemberId != null || this.nextMemberId != '' ? this.nextMemberId : ""],
            contactNumber: ['', Validators.required],
            accountnumber: [''],
            bankBranch: [''],
            ifscCode: [''],
            phonePayNumner: ['', Validators.required],
            chequeNumber: [''],
            emailAddress: ['']
        });

        this.form.valueChanges.subscribe(() => {
            this.isReadyToSave = this.form.valid;
        });
    }

    addMember() {

    }
    getPicture() {
        if (Camera['installed']()) {
            // this.camera.getPicture({
            //     destinationType: this.camera.DestinationType.DATA_URL,
            //     targetWidth: 96,
            //     targetHeight: 96
            // }).then((data) => {
            //     this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
            // }, () => {
            //     alert('Unable to take photo');
            // })

            let options = {
                maximumImagesCount: 1,
            }
            this.photos = new Array<string>();
            this.imagePicker.getPictures(options)
                .then((results) => {
                    this.reduceImages(results).then(() => {
                        console.log('all images cropped!!');
                    });
                }, (err) => { console.log(err) });

        } else {
            this.fileInput.nativeElement.click();
        }
    }

    reduceImages(selected_pictures: any): any {
        return selected_pictures.reduce((promise: any, item: any) => {
            return promise.then(() => {
                return this.cropService.crop(item, { quality: 75 })
                    .then(cropped_image => this.photos.push(cropped_image));
            });
        }, Promise.resolve());
    }

    processWebImage(event) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {

            let imageData = (readerEvent.target as any).result;
            this.form.patchValue({ 'profilePic': imageData });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    getProfileImageStyle() {
        return 'url(' + this.form.controls['profilePic'].value + ')'
    }

    /**
     * The user cancelled, so we dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the item, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }
}
