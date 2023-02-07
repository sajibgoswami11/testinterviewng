import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Common } from '../Common/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

  public authenticate(loginData) {
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });

    return this.http.post<any>(Common.baseUrl + '/api/ERP/system/Login', loginData, {headers: reqHeader})
    // return this.http.post<any>(Common.baseUrl + '/ERP/Auth/Login', loginData, { headers: reqHeader })
      .pipe(map(user => {
        console.log(user);
        if (user && user.token) {
          // store user details in local storage to keep user logged in
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.userName);
        }
      }));
  }

  public Get() {
    return this.http.get<any>(Common.baseUrl + '/Area/Home');
  }

  public logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
