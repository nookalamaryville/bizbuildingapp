import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { AuthProvider } from '../../providers/bizbuilding-service/auth';
import { EncryptDecrypt } from '../validators/EncryptDecrypt';
import { AlertsProvider } from '../../providers/alerts/alerts';


/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  signupResult:any;
  signupForm:FormGroup;
  propertySignUp:any={"Property":{"Name":""},"PropertyUser":{"Firstname":"","LastName":"","EmailAddress":"", "Password":"", "UserType":"Landlord"}}
  constructor(public navCtrl: NavController, public alertsProvider: AlertsProvider, public navParams: NavParams, public formBuilder: FormBuilder, public authProvider : AuthProvider, public encryptService: EncryptDecrypt) {
    this.signupForm = this.formBuilder.group({
      PropertyName:['', Validators.required],
      EmailAddress:['', Validators.compose([Validators.pattern(regexValidators.email), Validators.required])],
      Password:['', Validators.compose([Validators.pattern(regexValidators.password), Validators.required])]
    });
  }
  ionViewDidLoad() {
    
  }

  goHome() {
    this.navCtrl.push("HomePage");
  }
  async goRegister(){
    this.propertySignUp.Property.Name = this.signupForm.value.PropertyName;
    this.propertySignUp.PropertyUser.EmailAddress = this.signupForm.value.EmailAddress;    
    this.propertySignUp.PropertyUser.Password = this.encryptService.DESEncrypt(this.propertySignUp.PropertyUser.Password);
    this.signupResult = await this.authProvider.registerProperty(this.propertySignUp);
    this.alertsProvider.presentAlert(this.signupResult, "SignUp Status");
  }
}
