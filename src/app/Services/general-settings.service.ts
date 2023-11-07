import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralsettingService {

  constructor(private http:HttpClient) { }
  baseUral:string="https://localhost:44343/api/GeneralSettings"

  GetAllGeneralSetting(){
    return this.http.get(this.baseUral)
  }
  GetEmployeeGeneralSettingById(employeeId:any){
    return this.http.get(`${this.baseUral}/${employeeId}`)
  }

}