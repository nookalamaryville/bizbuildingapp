import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { AuthProvider } from '../bizbuilding-service/auth';

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileServiceProvider {
  baseURL = "http://ec2-3-15-22-20.us-east-2.compute.amazonaws.com/api/BizBuilding/";
  dataChanged$:  Observable<boolean>;
  private dataChangeSubject: Subject<boolean>
  constructor(public http: HttpClient, public authProvideer: AuthProvider) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  getPropertyInformation() {
    return this.http.get(this.baseURL + "GetPropertyInformation/" + this.authProvideer.currentUser.PropertyId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  saveCategory(item){
    this.http.post(this.baseURL + "SavePropertyInformation", item).subscribe(res => {
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
