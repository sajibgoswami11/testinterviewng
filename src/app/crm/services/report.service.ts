import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from '../helpers/common';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

constructor(private http: HttpClient) { }

  public taskReport(data) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/Reports/TaskReport', data);
  }

}
