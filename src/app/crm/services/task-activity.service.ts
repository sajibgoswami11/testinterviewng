import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from '../helpers/common';

@Injectable({
  providedIn: 'root'
})
export class TaskActivityService {

  constructor(private http: HttpClient) { }

  public getTaskActivityList() {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskActivity/GetTaskActivityList');
  }
  public TaskActivityById(data){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskActivity/GetTaskActivityById', data);
  }
  public deleteTaskactivity(data){
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskActivity/DeleteTaskActivityById' , data);
  }
  public createTaskactivity(data){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskActivity/CreateTaskActivity' , data);
  }
  public editTaskActivity(data){
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskActivity/UpdateTaskActivityByID', data);
  }
}
