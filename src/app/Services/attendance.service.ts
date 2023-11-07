import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:44343/api/Attendance';
  EmpsUrl:string= 'https://localhost:44343/api/Attendance/GetEmployeeList';
  EmpsWithoutAttendanceUrl:string= 'https://localhost:44343/api/Attendance/GetAllEmployeeWithoutAttendance';

  GetAllAttendance() {
    return this.http.get(this.baseUrl);
  }
  GetAttendanceById(attendanceid: number) {
    return this.http.get(`${this.baseUrl}/${attendanceid}`);
  }
  AddAttendance(attendance: any) {
    return this.http.post(this.baseUrl, attendance);
  }
  EditAttendance(attendance: any,attendanceid:number) {
    return this.http.put(`${this.baseUrl}/${attendanceid}`,attendance);
  }
  DeleteAttendance(attendanceid:number){
    return this.http.delete(`${this.baseUrl}/${attendanceid}`)
  }
  GetEmployeeList(){
    return this.http.get(this.EmpsUrl)
  }
  GetEmployeeListWithoutAttendance(){
    return this.http.get(this.EmpsWithoutAttendanceUrl)
  }
}
