import { Component } from '@angular/core';
import { DateTime, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BizbuildingServiceProvider } from '../../providers/bizbuilding-service/bizbuilding-service';

/**
 * Generated class for the TenantissuemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface TenantIssue {
  Logid:number,
  CategoryName:string,
  AssignedTo:number,  
  AssignedName:string,
  RequestedDate:DateTime,
  ResolveDate:DateTime,
  PropertyId:number,
  CategoryId:number,
  Location:string,
  GeoLocation:string,
  Description:string,
  Status:string
}
@IonicPage()
@Component({
  selector: 'page-tenantissuemodal',
  templateUrl: 'tenantissuemodal.html',
})
export class TenantissuemodalPage {
  item:TenantIssue;
  StatusList = ["New","Processing", "Completed"];
  StaffList:any=[];
  errorMessage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public dataService: BizbuildingServiceProvider) {
  }
  cancelModal(){
    this.view.dismiss();
  }
  submitData(){
    this.view.dismiss(this.item);
  }
  ionViewWillLoad() {
    this.item = this.navParams.get("data");
    this.dataService.getTenantStaffList()
      .subscribe(items => this.StaffList = items, error => this.errorMessage = <any>error);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TenantissuemodalPage');
  }

}
