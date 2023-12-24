import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Common } from '../helpers/common';
import { Cipher } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class StatusListService {

constructor(private http: HttpClient) { }
  public GetStatusList(){
   return this.http.get<any>( Common.baseUrl + '/ERP/TaskManagement/StatusList/GetStatusList' );
  }

  public GetStatusListById(data: any){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/StatusList/GetStatusByID' , data);
  }

  public CreateStatus(data: any){
    return this.http.post<any>(Common.baseUrl + '/ERP/TaskManagement/StatusList/CreateStatus/' , data);
  }

  public EditStatus(data: any){
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/StatusList/UpdteStatusById' , data);
  }
  public DeleteStatus(data: any){
    return this.http.put<any>(Common.baseUrl + '/ERP/TaskManagement/StatusList/DeleteStatusById' , data);
  }
  public GetStatusCategory(){
    return this.http.get<any>(Common.baseUrl + '/ERP/TaskManagement/StatusList/GetStatusCategory' );
  }
}
