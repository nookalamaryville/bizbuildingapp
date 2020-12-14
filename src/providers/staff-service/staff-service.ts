import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthProvider } from '../bizbuilding-service/auth';
import { AlertsProvider } from '../alerts/alerts';

/*
  Generated class for the StaffServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StaffServiceProvider {
  items:any = [];
  dataChanged$:  Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseURL = "http://ec2-3-15-22-20.us-east-2.compute.amazonaws.com/api/BizBuilding/";
  constructor(public http: HttpClient, public authProvideer: AuthProvider, public alertProvider: AlertsProvider) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  getStaffList(): Observable<object[]> {
    return this.http.get(this.baseURL + "GetStaffList/" + this.authProvideer.currentUser.PropertyId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }  
  getStaff(Id) {
    return this.http.get(this.baseURL + "GetUserInformation/" + Id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }  
  saveStaff(item){
    item.PropertyId = this.authProvideer.currentUser.PropertyId;
    this.http.post(this.baseURL + "SaveStaff", item).subscribe(res => {
      this.dataChangeSubject.next(true);
    }, execption=>{
      this.alertProvider.presentAlert(execption.error.Message, " Staff Status");
    });
  }
  removeStaff(id){
    this.http.delete(this.baseURL + "DeleteStaff/" + id).subscribe(res => {
      this.dataChangeSubject.next(true);
    })
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if(error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
