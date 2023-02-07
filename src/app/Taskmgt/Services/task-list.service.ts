import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Common } from '../Common/common'
@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  url = "/ERP/taskproject/CreatePorject";
  getuserurl ="/api/ERP/system/Users"; 
  constructor(private http: HttpClient) { }
  public createtaskList(data) {
    return this.http.post<any>(Common.baseUrl + this.url, data);
  }  
   public getuserList() {
    return this.http.get<any>(Common.baseUrl + this.getuserurl );
  }
}
