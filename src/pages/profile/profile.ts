import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/bizbuilding-service/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profileResult:any;
  profileForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authProvider : AuthProvider,) {
    this.profileForm = this.formBuilder.group({
      PropertyName:['', Validators.required],
      Address:[''],
      City:[''],
      State:[''],
      Zipcode:[]
    });
  }

  ionViewDidLoad() {
  }

}
