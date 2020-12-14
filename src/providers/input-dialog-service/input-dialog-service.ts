import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Checkbox, ModalController } from 'ionic-angular';
import { EncryptDecrypt } from '../../pages/validators/EncryptDecrypt';
import { BizbuildingServiceProvider } from '../../providers/bizbuilding-service/bizbuilding-service';
import { CategoryServiceProvider } from '../category-service/category-service';
import { StaffServiceProvider } from '../staff-service/staff-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {
  constructor(public alertCtrl: AlertController, public encryptService:EncryptDecrypt, public modalCtrl: ModalController, public dataService: BizbuildingServiceProvider, public categoryService: CategoryServiceProvider, public staffService: StaffServiceProvider) {
  }
  
  showComplaintPrompt(item) {
    const modal = this.modalCtrl.create("TenantissuemodalPage", {data: item});
    modal.present();
    modal.onDidDismiss(data => { //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
      if(data!==undefined) {
        if(data.LogId !== undefined){
          this.dataService.updateStatus(data);
        }
      }
    })
  }
  showStaffPrompt(item){
    const modal = this.modalCtrl.create("StaffmodalPage", {data: item});
    modal.present();
    modal.onDidDismiss(data => { //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
    if(data!==undefined) {
        if(data.UserId !== undefined){
          data.Password = this.encryptService.DESEncrypt(data.Password);
          this.staffService.saveStaff(data);
        }
      }
    })
  }
  showCategoryPrompt(item) {
    const modal = this.modalCtrl.create("CategorymodalPage", {data: item});
    modal.present();
    modal.onDidDismiss(data => { //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
      if(data!==undefined) {
        if(data.CategoryId !== undefined){
          this.categoryService.saveCategory(data);
        }
      }
    })
  }
}
