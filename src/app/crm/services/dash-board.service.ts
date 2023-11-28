import { Injectable } from '@angular/core';
import { Common } from '../helpers/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  constructor(private http: HttpClient) { }

  public GetSummaryByLogin() {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/DashBoard/GetSummaryByLogin');
  }

  public GetProjectProgress() {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/DashBoard/GetProjectProgress');
  }

  public GetSummary(data) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/DashBoard/GetSummary', data);
  }

}
