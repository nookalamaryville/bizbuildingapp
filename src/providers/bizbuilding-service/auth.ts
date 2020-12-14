import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import axios from 'axios';

/*
  Generated class for the BizbuildingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface User {
  UserId:number,
  PropertyId:number,
  EmailAddress:string
}
@Injectable()
export class AuthProvider {
  currentUser: User;
  signupresult:string = '';
  baseURL = "http://ec2-3-15-22-20.us-east-2.compute.amazonaws.com/api/BizBuilding/";
  constructor(public http: HttpClient) {
  }
  async registerProperty(propertySgnUp) {
    return await axios.post(this.baseURL + "SignUp", propertySgnUp).then(function (response) {
      return "Thank you for signup.";
    })
    .catch(function (error) {
      return error.response.data.Message;
    });
  }
  async userLogin(userLogin) {
    return await axios.post(this.baseURL + "GetLogInInformation", userLogin).then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {UserId:0,PropertyId:0,Message:error.response.data.Message};
    });
  }
  createLoginSession(UserInfo): Promise<boolean> {
    return new Promise((resolve, reject) =>{
      this.currentUser = {
        UserId:UserInfo.UserId,
        PropertyId:UserInfo.PropertyId,
        EmailAddress:UserInfo.EmailAddress
      };
      resolve(true);
    });    
  }
  isLoggedIn()
  {
    return this.currentUser != null;
  }
  logout()
  {
    this.currentUser = null;
  }
}
