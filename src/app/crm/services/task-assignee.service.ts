import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from '../helpers/common';

@Injectable({
  providedIn: 'root'
})
export class TaskAssigneeService {

constructor(private http: HttpClient) { }

  public getTaskAssigneeList(){
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskAssign/GetTaskAssignList');
  }

  public getTaskAssigneeById(data){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskAssign/GetAssignTaskById', data);
  }

  public TaskSatarPause(data){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskAssign/TaskSatarPause', data);
  }

  public AssignTimeExtend(data){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskAssign/AssignTimeExtend', data);
  }
}
