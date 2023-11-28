import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from '../helpers/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  constructor(private http: HttpClient) { }
  public getEmployeeList() {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/EmployeeList/GetEmployee');
  }

  public GetEmployeeByProjectModule(data:any) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/EmployeeList/GetEmployeeByProjectModule', data);
  }

  public getEmployeeById(data:any) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/EmployeeList/GetEmployeeById', data);
  }
  public getUserGroup(){
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetUsersGroupList' );
  }
  public getBranch(){
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetCompanyBranch' );
  }
  public getCompany(){
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetCompany' );
  }
  public editEmployee(data: any) {
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/EmployeeList/UpdateEmployee', data);
  }

  public createEployee(data: any) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/EmployeeList/CreateEmployee', data);
  }

  public createRole(data: any) {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/CreateUsersGroup', data);
  }
  public changePassWord(data: any){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/ChangePassword', data);
  }
  public getMenuData()
  {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetCompanyAccessPolicyWiseMenuData' ) ;
  }

  public GetUserWiseAccessPolicyMenu()
  {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetUserWiseAccessPolicyMenu' );
  }

  public getRoleWiseMenu()
  {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetUserGroupWiseAccessPolicyMenu' );
  }
  public getGroupWisemenu(data: any)
  {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetMenuByGroup' , data );
  }

  public updateSystemMenuById(data: any)
  {
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/UpdateSystemMenuById' , data );
  }

  public createUser(data: any)
  {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/CreateUsers' , data );
  }

  public getUserList()
  {
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetUsersList'  );
  }
  public getUserById(data: any)
  {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/GetUsersById' , data);
  }

  public editUser(data: any)
  {
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/UpdateUsers', data);
  }

  public insertMenuforUser(data: any)
  {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/CreateRoleWiseAccessPolicyMenu', data);
  }

  public insertSystemMenu(data: any)
  {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/CreateMenu', data);
  }

  public RoleWiseMenu(data: Partial<{ userRoleId: string | null; }>)
  {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/RoleWiseMenu', data);
  }

  public PostUserWiseMenu(data: Partial<{ userId: string | null; menuId: any; }>)
  {
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/TaskUsers/PostUserWiseMenu', data);
  }

}
