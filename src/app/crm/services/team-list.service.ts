import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from '../helpers/common';

@Injectable({
  providedIn: 'root'
})
export class TeamListService {

  constructor(private http: HttpClient) { }

  public getTeamById(id) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/Team/GetTaskTeamById' , id);
  }

  public createTeam(data) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/Team/CreateTeam', data);
  }

  public editTeam(data) {
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/Team/UpdateTeam', data);
  }

  public getTeamList() {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/Team/GetTaskTeams');
  }

  public GetTeamWiseEmployeeMapping(teamId) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/Team/GetTeamWiseEmployeeMapping', teamId);
  }

  public deleteTeam(id) {
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/Team/DeleteTeam', id);
  }


}
