import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:44343/api/Employee';

  GetAllEmployee() {
    return this.http.get(this.baseUrl);
  }
  GetEmployeeById(employeeId: number) {
    return this.http.get(`${this.baseUrl}/${employeeId}`);
  }
  AddEmployee(employee: any) {
    return this.http.post(this.baseUrl, employee);
  }
  EditEmployee(employee: any,employeeid:number) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${employeeid}`,employee);
  }
  DeleteEmployee(employeeid:number){
    return this.http.delete(`${this.baseUrl}/${employeeid}`)
  }
}
