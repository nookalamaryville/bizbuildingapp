import { Injectable } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

/*
  Generated class for the AlertsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertsProvider {

  constructor(public alertCtrl: AlertController) {
  }
  presentAlert(message, title) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
