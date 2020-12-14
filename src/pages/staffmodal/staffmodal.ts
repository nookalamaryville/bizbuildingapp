import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/bizbuilding-service/auth';
import { StaffServiceProvider } from '../../providers/staff-service/staff-service';
import { EncryptDecrypt } from '../validators/EncryptDecrypt';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { regexValidators } from '../validators/validator';

/**
 * Generated class for the StaffmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staffmodal',
  templateUrl: 'staffmodal.html',
})
export class StaffmodalPage {
  title='';
  errorMessage = '';
  disabled:boolean=false;
  item = {UserId:0, PropertyId:0, FirstName:'', LastName:'',FUllName:'', EmailAddress:'', Password:'',PhoneNumber:'', UserType:''};
  UserTypes = ["Landlord","Manager", "Staff"];
  staffForm:FormGroup;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,  public dataService:StaffServiceProvider, public navParams: NavParams, public view: ViewController, public authProvider: AuthProvider, public encryptService: EncryptDecrypt) {
    this.staffForm = this.formBuilder.group({
      UserId:[this.item.UserId],
      PropertyId:[this.item.PropertyId],
      FirstName:[this.item.FirstName, Validators.required],
      LastName:[this.item.LastName],
      EmailAddress:[this.item.EmailAddress, Validators.compose([Validators.pattern(regexValidators.email), Validators.required])],
      PhoneNumber:[this.item.PhoneNumber],
      UserType:[this.item.UserType, Validators.required],
      Password:[this.item.Password, Validators.compose([Validators.pattern(regexValidators.password), Validators.required])]
    });
  }

  ionViewDidLoad() {
  }
  cancelStaff(){
    this.view.dismiss();
  }
  submitStaff(){
    console.log(this.item);
    //this.view.dismiss(this.item);
  }
  ionViewWillLoad() {
    this.item = this.navParams.get("data");
    this.item.PropertyId = this.authProvider.currentUser.PropertyId;
    if(this.item.UserType == "Landlord"){
      this.disabled =true;
    }
    if(this.item.UserId > 0) {
    this.dataService.getStaff(this.item.UserId)
      .subscribe(staff => this.item.Password = this.encryptService.DESDecrypt(staff.Password), error => this.errorMessage = <any>error);
    }
    this.title = this.item.UserId===0?"Add Staff": "Edit Staff";
  }

}
