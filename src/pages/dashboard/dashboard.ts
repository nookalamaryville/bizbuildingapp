import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BizbuildingServiceProvider } from '../../providers/bizbuilding-service/bizbuilding-service';
import { ToastController } from 'ionic-angular';
import { TenantissuemodalPage } from '../tenantissuemodal/tenantissuemodal';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  items: any = [];
  errorMessage: string;
  constructor(public navCtrl: NavController, public view: ViewController, public toastCtrl: ToastController, public navParams: NavParams, public inputDialogService: InputDialogServiceProvider, public dataService: BizbuildingServiceProvider) {
    dataService.dataChanged$.subscribe((dataCahnged: boolean) => {
      this.loadTenantIssues();
    });
  }

  ionViewDidLoad(){
    this.loadTenantIssues();
  }
  loadTenantIssues(){
    this.dataService.getTenantIssues()
      .subscribe(items => this.items = items, error => {this.errorMessage = <any>error; this.items=[];});
  }
  
  editModalItem(item) {
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + item.LogId + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showComplaintPrompt(item);
  }
  removeItem(item) {
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + item.LogId +', ' + item.Location,
      duration: 4000
    });
    toast.present();
    this.dataService.removeTenantIssue(item.LogId);
  }
  goCompplaint() {
    this.inputDialogService.showTenantComplaintPrompt();
  }
}
