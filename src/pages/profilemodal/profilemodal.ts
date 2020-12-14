import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';

/**
 * Generated class for the ProfilemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilemodal',
  templateUrl: 'profilemodal.html',
})
export class ProfilemodalPage {
  profileForm:FormGroup
  item:any = [];
  title = "Property Information"
  constructor(public navCtrl: NavController, public view: ViewController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      PropertyId:[0],
      Name:['', Validators.required],
      Address:[''],
      City:[''],
      State:[''],
      Zipcode:['']
    });
  }

  ionViewWillLoad() {
    this.item = this.navParams.get("data");
    this.profileForm.setValue(this.item);
  }
  cancelModal(){
    this.view.dismiss();
  }
  saveProperty(){
    this.view.dismiss(this.profileForm.value);
  }
}
