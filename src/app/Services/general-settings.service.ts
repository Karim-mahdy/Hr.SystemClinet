import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralsettingService {

  constructor(private http:HttpClient) { }
  baseUrl:string="https://localhost:44343/api/GeneralSettings"

  GetAllGeneralSetting(){
    return this.http.get(this.baseUrl)
  }
  GetEmployeeGeneralSettingById(Id:number){
    return this.http.get(`${this.baseUrl}/${Id}`)
  }
  
  AddGeneralSetting(data:any) {
    return this.http.post(this.baseUrl,data);
  }
  EditGeneralSetting(data: any,id :number){
   return this.http.put(`${this.baseUrl}/${id}`, data );
  }
  DeleteGeneralSetting(id: number):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}