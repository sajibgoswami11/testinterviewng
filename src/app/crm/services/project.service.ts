import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Common } from '../helpers/common';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

 public getProjectById(data) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskProject/GetProjectById', data);
  }

  public createProject(data) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskProject/CreateProject', data);
  }

  public EditProject(data) {
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskProject/UpdateProjectByID', data);
  }

  public getProjectList() {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskProject/GetTaskProject' );
  }
  public deleteProject(data) {
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskProject/DeleteProjectID' , data);
  }
}
