import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/bizbuilding-service/auth';

/**
 * Generated class for the TenantcomplaintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tenantcomplaint',
  templateUrl: 'tenantcomplaint.html',
})
export class TenantcomplaintPage {
  lat:any;
  lng:any;
  categoriesList:any;
  complaintForm:FormGroup;
  errorMessage = '';
  disabled:boolean=true;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public view: ViewController, public navParams: NavParams, public categoryService: CategoryServiceProvider, public geolocation: Geolocation, public formBuilder: FormBuilder) {
    this.getUserLocation();
    this.complaintForm = this.formBuilder.group({
      PropertyId:[this.authProvider.currentUser.PropertyId],
      CategoryId:[, Validators.required],
      Location:[''],
      GeoLocation:[''],
      Description:[''],
      Status:['New']
    });
  }
  getUserLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
      if(this.lat!=undefined) {
        this.complaintForm.controls["GeoLocation"].setValue(this.lat +','+this.lng);
      }
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //  });
  }
  ionViewDidLoad() {    
    this.categoryService.getCategories()
      .subscribe(items => this.categoriesList = items, error => this.errorMessage = <any>error);
  }
  cancelModal(){
    this.view.dismiss();
  }
  submitComplaint(){
    this.view.dismiss(this.complaintForm.value);
  }

}
