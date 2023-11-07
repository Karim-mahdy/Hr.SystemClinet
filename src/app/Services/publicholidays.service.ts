import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicholidaysService {

  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:44343/api/PublicHolidays';

  GetAllPublicholidys() {
    return this.http.get(this.baseUrl);
  }
  GetPublicholidyId(id: any) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  AddPublicholidy(data:any) {
    return this.http.post(this.baseUrl,data );
  }
  EditPublicholidy(data: any, id: any){
   return this.http.put(`${this.baseUrl}/${id}`,data);
  }
  DeletePublicholidy(id: any):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
