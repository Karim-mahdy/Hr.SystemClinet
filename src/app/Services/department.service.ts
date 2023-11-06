import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {}
  

  baseUrl: string = 'https://localhost:44343/api/Department';

  GetAllDepartment() {
    return this.http.get(this.baseUrl);
  }
  GetDepartmentById(departmentId: any) {
    return this.http.get(`${this.baseUrl}/${departmentId}`);
  }
  AddDepartment(department:any) {
    return this.http.post(this.baseUrl,department );
  }
  EditDepartment(department: any, departmentId: any){
   return this.http.put(`${this.baseUrl}/${departmentId}`, department );
  }
  DeleteDepartment(departmentId: any):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${departmentId}`);
  }
}
