import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Common } from '../helpers/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = Common.baseUrl + '/ERP/Auth/Login';
  constructor(private http: HttpClient,private router:Router) { }

  public authenticate(loginData: any)
  {
    let reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post<any>(this.url, loginData, {headers: reqHeader})
    .pipe(map(user => {
      if (user && user.token) {
        // set user and token
        localStorage.setItem('token', user.token);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userId', user.userId);
        localStorage.setItem('empId', user.empId);
        localStorage.setItem('userGroup', user.userGroup);
      }
    }));
  }

  public Get()
  {
    return this.http.get<any>(Common.baseUrl + '/ERP/Home');
  }

  public logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('empId');
    localStorage.removeItem('userGroup');
    localStorage.removeItem('userMenuData');
    if(!localStorage.getItem('token')){
      this.router.navigate(['/login']);
    }
  }

  public getMenuData()
  {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetCompanyAccessPolicyWiseMenuData' )
    .pipe(map(menuData => {
      // tslint:disable-next-line: prefer-for-of
      // for (let i = 0; i < menuData.accessPolicyWiseMenuData.length; i++)
      // {
       localStorage.setItem('userMenuData', JSON.stringify( menuData.accessPolicyWiseMenuData));
      // }
    })) ;
  }
}
