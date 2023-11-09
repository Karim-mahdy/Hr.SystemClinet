import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.decodeUserData();
    }
  }

  baseUrl: string = 'https://localhost:44343/api/Authentication/Login';
  userData = new BehaviorSubject(null);

  decodeUserData() {
    let encodedToken = localStorage.getItem('jwt');
    if (encodedToken !== null) {
      let decodedToken: any = jwtDecode(encodedToken);
      this.userData.next(decodedToken);
     
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.userData.next(null);
    this.router.navigate(['/SignIn']);
  }

  login(userData: any): Observable<any> { // Updated userData type to any
    console.log(userData);
    return this.http.post(`${this.baseUrl}`, userData);
  }

  // Removed unused jwtDecode function
}
