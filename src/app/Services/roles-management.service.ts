import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { PermissionsGurdService } from './permissions-gurd.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RolesManagementService {

  constructor(private http: HttpClient,
    private router: Router,
    private permissionsGuardService: PermissionsGurdService,
    private authservice: AuthenticationService
    ) { }
  baseUrl= 'https://localhost:7146/api/RoleManager';
  secondUrl='https://localhost:7146/api/RoleManager/Create';
  checkPermission(requiredServicePermission: string): boolean {
    const token = localStorage.getItem('jwt') ?? '';
    if (this.permissionsGuardService.hasRole(token, ['SuperAdmin'])) {
      return true;
    }
    if (this.permissionsGuardService.hasPermission(token, [requiredServicePermission])) {
      return true;
    }
    this.router.navigate(['/Dashboard/AccessDenied']);
    return false;
  }

 
  
  GetAllRoles(): Observable<any> {
    if (this.checkPermission('Permission.Permission.View')) {
      return this.http.get(this.baseUrl);
    } else {
      return of([]);
    }
  }

  GetRoleById(roleId: any): Observable<any> {
    if (this.checkPermission('Permission.Permission.Edit')) {
      return this.http.get(`${this.baseUrl}/GetRole?roleId=${roleId}`);
    } else {
      return of([]);
    }
  }

  GetDataToCreate(): Observable<any> {
    if (this.checkPermission('Permission.Permission.View')) {
      return this.http.get(this.secondUrl);
    } else {
      return of([]);
    };
  }

  AddRole(role: any): Observable<any> {
    if (this.checkPermission('Permission.Permission.Create')) {
      return this.http.post(this.baseUrl, role);
    } else {
      return of([]);
    }
  }

  EditRole(role: any, roleId: any): Observable<any> {
    if (this.checkPermission('Permission.Permission.Edit')) {
      console.log(role);
      console.log(roleId);
      
      
      return this.http.put(`${this.baseUrl}/${roleId}`, role).pipe(
        tap(() =>  this.authservice.refreshToken()), // Tap into the observable and refresh the token
        catchError(() => of([]))
        
      );
    } else {
      return of([]);
    }
  }

  DeleteRole(roleId: any): Observable<any> {
    if (this.checkPermission('Permission.Permission.Delete')) {
      return this.http.delete(`${this.baseUrl}/${roleId}`);
    } else {
      return of([]);
    }
  }
}

