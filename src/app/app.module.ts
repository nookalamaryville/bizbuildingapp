import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { BizbuildingServiceProvider } from '../providers/bizbuilding-service/bizbuilding-service';
import { AuthProvider } from '../providers/bizbuilding-service/auth';
import { OuterheaderComponent } from '../components/outerheader/outerheader';
import { EncryptDecrypt } from '../pages/validators/EncryptDecrypt';
import { AlertsProvider } from '../providers/alerts/alerts';
import { InputDialogServiceProvider } from '../providers/input-dialog-service/input-dialog-service';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { StaffServiceProvider } from '../providers/staff-service/staff-service';

@NgModule({
  declarations: [
    MyApp,
    OuterheaderComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EncryptDecrypt,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BizbuildingServiceProvider,
    AuthProvider,
    AlertsProvider,
    InputDialogServiceProvider,
    CategoryServiceProvider,
    StaffServiceProvider
  ]
})
export class AppModule {}
