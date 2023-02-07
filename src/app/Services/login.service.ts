import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="https://localhost:44354/Area/Login";

  constructor(private http:HttpClient) { }

  public authenticate(loginData)
  {
    var reqHeader=new HttpHeaders({'No-Auth':'True'});
    return this.http.post<any>(this.url,loginData,{headers:reqHeader})
    .pipe(map(user => {
      if (user && user.token) {
          // store user details in local storage to keep user logged in
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', "Username");          
      }
  }));
  }

  public Get()
  {
    return this.http.get<any>('https://localhost:44354/Area/Home');
  }

  public logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}
}
