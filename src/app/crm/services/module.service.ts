import { Injectable } from '@angular/core';
import { Common } from '../helpers/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }
  public getModuleList() {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskModule/GetTaskModule');
  }
  public getModuleById(id) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskModule/GetModuleById' , id);
  }
  public editModule(data) {
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskModule/UpdateModuleByID', data);
  }
  public createModule(data) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskModule/CreateModule', data);
  }
  public deleteModule(id){
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskModule/DeleteModuleByID', id);
  }
  public getModuleByProject(data){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskModule/GetModuleListByProjectId' , data );
  }

  public getModuleWiseTeamMeamber(data){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskModule/GetModuleWiseTeamMember' , data );
  }

}
