import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersManagmentService {

 constructor(private http: HttpClient) {}
 secondUrl: string = 'https://localhost:44343/api/User/GetToCreate';
  baseUrl: string = 'https://localhost:44343/api/User';

  GetDataFormToCreate() {
    return this.http.get(this.secondUrl);
  }

  GetAllUsers(){
    return this.http.get(this.baseUrl)
  }
  AddNewUser(user:any){
    return this.http.post(this.baseUrl,user)
  }
  GetUserById(id:any){
    return this.http.get(`${this.baseUrl}/GetUserById?userId=${id}`)
  }

  EditUser(user:any,id :string){
    return this.http.put(`${this.baseUrl}/${id}`,user)
  }

  DeleteUser(id:any){
    return this.http.delete(`${this.baseUrl}/RemoveUser?userId=${id}`)
  }
}
