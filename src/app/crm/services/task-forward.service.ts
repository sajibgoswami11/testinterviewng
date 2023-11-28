import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from '../helpers/common';

@Injectable({
  providedIn: 'root'
})
export class TaskForwardService {

  constructor(private http: HttpClient) { }
  public getTaskForwardList(){
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskForward/GetTaskForwardList');
  }

  public createTaskForward(data){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskForward/CreateTaskForward', data);
  }

  public updateTaskForward(data){
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskForward/UpdateTaskForwardByID', data);
  }

}
