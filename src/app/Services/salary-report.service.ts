import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryReportService {

  constructor(private http:HttpClient) { }
  BaseUrl:string="https://localhost:44343/api/SalaryReport/CalculateSalaryReports"
  FilterUrl:string="https://localhost:44343/api/SalaryReport"

  GetAllSalaryReport(){
    return this.http.get(this.BaseUrl)
  }

  FilterSalaryReport(data:any){
    return this.http.post(this.FilterUrl,data)
  }
}