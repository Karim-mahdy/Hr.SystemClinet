import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesManagementService {

  constructor(private http: HttpClient) { }
  baseUrl= 'https://localhost:44343/api/RoleManager';
  secondUrl='https://localhost:44343/api/RoleManager/Create';


  GetAllRoles(){
    return this.http.get(this.baseUrl);
  }
  GetDataToCreate(){
    return this.http.get(this.secondUrl);
  }
  GetRoleById(id: any){
    return this.http.get(`${this.baseUrl}/GetRole?roleId=${id}`);
  }
  EditRole(data: any,id: any){
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }
  AddRole(data:any){
    return this.http.post(this.baseUrl,data);
  }
  DeleteRole(id: any){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

