import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { EncryptDecrypt } from '../validators/EncryptDecrypt';
import { AuthProvider } from '../../providers/bizbuilding-service/auth';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  signupResult:any;
  loginData:any={"EmailAddress":"", "Password":""} 
  currentUser = {UserId:0, PropertyId:0,EmailAddress:""} /* Object for user session */
  signinForm:FormGroup;
  constructor(public navCtrl: NavController, public alertsProvider: AlertsProvider, public formBuilder: FormBuilder, public navParams: NavParams, public authProvider : AuthProvider, public encryptService: EncryptDecrypt) {
    this.signinForm = this.formBuilder.group({
      EmailAddress:['', Validators.compose([Validators.pattern(regexValidators.email), Validators.required])],
      Password:['', Validators.compose([Validators.pattern(regexValidators.password), Validators.required])]
    });
  }

  ionViewDidLoad() {
    
  }
  goHome() {
    this.navCtrl.push("HomePage");
  }
  
   async SignInDashboard(){
    this.loginData.EmailAddress = this.signinForm.value.EmailAddress;    
    this.signupResult =  await this.authProvider.userLogin(this.loginData);
    if(this.signupResult.UserId === 0) {
      this.alertsProvider.presentAlert(this.signupResult.Message, "SignIn Status");
    }
    else {
      if(this.encryptService.DESEncrypt(this.signinForm.value.Password) === this.signupResult.Password) {
        this.currentUser.UserId = this.signupResult.UserId;
        this.currentUser.PropertyId = this.signupResult.PropertyId;
        this.currentUser.EmailAddress = this.signinForm.value.EmailAddress; 
        this.authProvider.createLoginSession(this.currentUser);
        this.navCtrl.setRoot("MenuPage");
      }
      else {
        this.alertsProvider.presentAlert("Email address or password is invalid.", "SignIn Status");
      }
    }
  }
}
