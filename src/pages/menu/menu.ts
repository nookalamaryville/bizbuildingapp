import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, Nav, NavController, NavParams } from 'ionic-angular';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { AuthProvider } from '../../providers/bizbuilding-service/auth';
import { DashboardPage } from '../dashboard/dashboard';
import { HomePage } from '../home/home';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  username:string = '';
  pages = []
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, public alertService: AlertsProvider, public navParams: NavParams, public authProvider: AuthProvider, public appCtrl: App) {
  }

  ionViewWillEnter() {
    if(this.authProvider.isLoggedIn()) {
      this.pages = [
        {title:"Dashboard", page:"DashboardPage",icon:"home"},
        {title:"Profile", page:"ProfilePage",icon:"settings"},
        {title:"Staff", page:"StaffPage",icon:"people"},
        {title:"Categories", page:"CategorytypesPage",icon:"hammer"},
      ];
      this.onePage("DashboardPage");

      this.username = this.authProvider.currentUser.EmailAddress // Assigning username to  display at menu footer.
    }
    else {
      this.alertService.presentAlert("You lost session. Please login again.", "Login Status")
      this.navCtrl.setRoot("LoginPage");
      //this.appCtrl.getRootNavById("HomePage");
    }
  }    
  onePage(page) {
    this.nav.setRoot(page);
  }
  logout(){
    this.authProvider.logout();
    this.appCtrl.getRootNavById("HomePage");
  }
}
