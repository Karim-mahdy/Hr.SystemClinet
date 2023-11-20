import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PermissionsGurdService } from './permissions-gurd.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolesManagementService {

  constructor(private http: HttpClient,
    private router: Router,
    private permissionsGuardService: PermissionsGurdService
    ) { }
  baseUrl= 'https://localhost:44343/api/RoleManager';
  secondUrl='https://localhost:44343/api/RoleManager/Create';
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
      return this.http.put(`${this.baseUrl}/${roleId}`, role);
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

