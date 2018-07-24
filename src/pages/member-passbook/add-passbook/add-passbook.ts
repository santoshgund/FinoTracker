import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

import { MemberData } from '../../../providers/member-data';

@IonicPage()
@Component({
    selector: 'page-add-passbook',
    templateUrl: 'add-passbook.html'
})
export class AddPassbookPage {
    @ViewChild('fileInput') fileInput;

    isReadyToSave: boolean;

    item: any;

    form: FormGroup;
    isDisabled = true;
    isReadonly = false;
    nextMemberId: any;

    selectedValue: number;
    optionsList: any[] = [];
    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public formBuilder: FormBuilder,
        public memberService: MemberData) {

        this.optionsList.push({ value: 1, text: 'option 1', checked: true });
        this.optionsList.push({ value: 2, text: 'option 2', checked: false });

        
    }

    ionViewDidLoad() {
        this.form = this.formBuilder.group({
            // memberName: [''],
            emi_Amount: [''],
            selectedValue:[1]
        });

        this.form.valueChanges.subscribe(() => {
            this.isReadyToSave = this.form.valid;
        });
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
