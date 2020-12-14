import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { startWith } from 'rxjs/operator/startWith';
import { AuthProvider } from '../../providers/bizbuilding-service/auth';

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
  item = {CategoryId:0, PropertyId:0, 'Name':'', 'Description':''};
  title = "Add Category";
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategorymodalPage');
  }
  cancelCategory(){
    this.view.dismiss();
  }
  submitCategory(){
    this.view.dismiss(this.item);
  }
  ionViewWillLoad() {
    this.item = this.navParams.get("data");
    this.item.PropertyId = this.authProvider.currentUser.PropertyId;
    console.log(this.item);
    this.title = this.item.Name === ''?"Add Category": "Edit Category";
  }
}
