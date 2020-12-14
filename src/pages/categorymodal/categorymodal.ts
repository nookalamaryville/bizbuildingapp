import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { startWith } from 'rxjs/operator/startWith';
import { AuthProvider } from '../../providers/bizbuilding-service/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * Generated class for the CategorymodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorymodal',
  templateUrl: 'categorymodal.html',
})
export class CategorymodalPage {
  item = {CategoryId:0, PropertyId:0, Name:'', Description:''};
  title = "Add Category";
  categoryForm:FormGroup;
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams, public view: ViewController, public authProvider: AuthProvider) {
    this.categoryForm = this.formBuilder.group({
      CategoryId:[this.item.CategoryId],
      PropertyId:[this.item.PropertyId],
      Name:[this.item.Name, Validators.required],
      Description:[this.item.Description]
    });
  }

  ionViewDidLoad() {
  }
  cancelCategory(){
    this.view.dismiss();
  }
  submitCategory(){
    this.view.dismiss(this.categoryForm.value);
  }
  ionViewWillLoad() {
    this.item = this.navParams.get("data");
    this.item.PropertyId = this.authProvider.currentUser.PropertyId;
    this.categoryForm.setValue(this.item);
    this.title = this.item.Name === ''?"Add Category": "Edit Category";
  }
}
