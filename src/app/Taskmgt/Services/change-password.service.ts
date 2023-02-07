import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Common} from '../Common/common';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  url="/Area/Home";

  constructor(private http:HttpClient) { }

  public changePassword(data)
  { 
    return this.http.post<any>(Common.baseUrl + this.url,data);
  }
}
