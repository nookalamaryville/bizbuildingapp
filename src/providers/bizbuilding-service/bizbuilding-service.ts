import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import axios from 'axios';
import { AuthProvider } from './auth';

/*
  Generated class for the BizbuildingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BizbuildingServiceProvider {
  items:any = [];
  dataChanged$:  Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseURL = "http://ec2-3-15-22-20.us-east-2.compute.amazonaws.com/api/BizBuilding/";
  constructor(public http: HttpClient, public authProvideer: AuthProvider) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  getTenantIssues(): Observable<object[]> {
    return this.http.get(this.baseURL + "GetLogs/"  + this.authProvideer.currentUser.PropertyId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  updateStatus(item){
    this.http.post(this.baseURL + "UpdateLogStatus", {"LogId":item.LogId, "Status": item.Status,"AssignedTo":item.AssignedTo }).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }
  removeTenantIssue(id){
    this.http.delete(this.baseURL + "DeleteLog/" + id).subscribe(res => {
      this.dataChangeSubject.next(true);
    })
  }
  getTenantStaffList(){
    return this.http.get(this.baseURL + "GetStaffList/" +  + this.authProvideer.currentUser.PropertyId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
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
