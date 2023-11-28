import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from '../helpers/common';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(private http: HttpClient) { }

  public getTaskList() {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskList/GetTaskList' );
  }

  getTaskById(data) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskList/GetTaskById', data);
  }

  public createTask(data) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskList/CreateTask', data);
  }

  public editTask(data) {
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskList/UpdateTaskByID', data);
  }

  public deleteTask(data){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskList/DeleteTaskById', data);
  }
}
