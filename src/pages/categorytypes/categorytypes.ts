import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BizbuildingServiceProvider } from '../../providers/bizbuilding-service/bizbuilding-service';
import { ToastController } from 'ionic-angular';
import { TenantissuemodalPage } from '../tenantissuemodal/tenantissuemodal';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';

/**
 * Generated class for the CategorytypesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorytypes',
  templateUrl: 'categorytypes.html',
})
export class CategorytypesPage {
  item = {CategoryId:0, PropertyId:0, 'Name':'', 'Description':''};
  items: any = [];
  errorMessage: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public inputDialogService: InputDialogServiceProvider, public dataService: CategoryServiceProvider) {
    dataService.dataChanged$.subscribe((dataCahnged: boolean) => {
      this.loadCategories();
    });
  }

  ionViewDidLoad(){
    this.loadCategories();
  }
  loadCategories(){
    this.dataService.getCategories()
      .subscribe(items => this.items = items, error => this.errorMessage = <any>error);
      console.log( this.items);
  }
  addCategory(){
    this.inputDialogService.showCategoryPrompt(this.item);
  }  
  editCategory(item) {
    const toast = this.toastCtrl.create({
      message: 'Editing Category - ' + item.CategoryId + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showCategoryPrompt(item);
  }
  removeCategory(item) {
    const toast = this.toastCtrl.create({
      message: 'Removing Category - ' + item.CategoryId +', ' + item.Name,
      duration: 4000
    });
    toast.present();
    this.dataService.removeCategory(item.CategoryId);
  }

}
