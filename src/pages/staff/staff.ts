import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { StaffServiceProvider } from '../../providers/staff-service/staff-service';

/**
 * Generated class for the StaffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html',
})
export class StaffPage {
  item = {UserId:0, PropertyId:0, FirstName:'', LastName:'',FUllName:'', EmailAddress:'', Password:'',PhoneNumber:'', UserType:''};
  items: any = [];
  errorMessage: string;
  constructor(public navCtrl: NavController, public alertProvier:AlertsProvider, public toastCtrl: ToastController, public inputDialogService: InputDialogServiceProvider, public navParams: NavParams, public dataService: StaffServiceProvider) {
    dataService.dataChanged$.subscribe((dataCahnged: boolean) => {
      this.loadStaffList();
    });
  }

  ionViewDidLoad(){
    this.loadStaffList();
  }
  loadStaffList(){
    this.dataService.getStaffList()
      .subscribe(items => this.items = items, error => this.errorMessage = <any>error);
  }
  addStaff(){
    this.inputDialogService.showStaffPrompt(this.item);
  }  
  editStaff(item) {
    const toast = this.toastCtrl.create({
      message: 'Editing Staff - ' + item.UserId  + ', ' + item.FullName + " ...",
      duration: 4000
    });
    toast.present();
    this.inputDialogService.showStaffPrompt(item);
  }
  removeStaff(item) {
    if(item.UserType == "Landlord"){
      this.alertProvier.presentAlert("You cannot delete landlord.", "Remove Status");
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Removing Staff - ' + item.UserId +', ' + item.FullName,
        duration: 4000
      });
      toast.present();
      this.dataService.removeStaff(item.UserId);
    }
  }

}
