import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/bizbuilding-service/auth';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';

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
  Info = {PropertyId:0, Name:'', Address:'', City:'', State:'', Zipcode:''};
  propertyId:number;
  errorMessage='';
  constructor(public navCtrl: NavController, public inputDialogService: InputDialogServiceProvider, public navParams: NavParams, public formBuilder: FormBuilder, public authProvider : AuthProvider, public dataService: ProfileServiceProvider) {
    dataService.dataChanged$.subscribe((dataCahnged: boolean) => {
      this.loadPropertyInformation();
    });
  }

  ionViewDidLoad() {
    this.loadPropertyInformation();
  }
  loadPropertyInformation(){
    this.propertyId = this.authProvider.currentUser.PropertyId;
    this.dataService.getPropertyInformation()
      .subscribe(data => {this.Info = data; this.Info.PropertyId =this.authProvider.currentUser.PropertyId; }, error => this.errorMessage = <any>error);
  }
  editProperty() {
    this.inputDialogService.showProfilePrompt(this.Info);
  }
  goCompplaint() {
    this.inputDialogService.showTenantComplaintPrompt();
  }
}
