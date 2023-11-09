import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PermissionsGurdService implements CanActivate{

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  Permissions: string[] = [];

  isAuthenticated(token: string):boolean{
      if(token && token !== "null" && token.length != 0 && !this.jwtHelper.isTokenExpired(token)){
         
          return true;
      }

      return false;
  }

  hasRole(token: string, allowedRoles: string[]){
      const decodedToken = this.jwtHelper.decodeToken(token);
     
      if(allowedRoles === undefined)
        return true;

      for(let key in decodedToken){
          if(key.includes("role")){
              return allowedRoles.some(role => decodedToken[key].includes(role));
          }
      }
      return false;
  }

  hasPermission(token: string, allowedPermissions: string[]){
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken);
    console.log(allowedPermissions);
    if(allowedPermissions === undefined)
      return true;

    for(let key in decodedToken){
      if(key.includes("Permission")){
          return allowedPermissions.some(permission => decodedToken[key].includes(permission));
      }
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
      const roles = route.data['allowedRoles'];
       
      Permissions = route.data['allowedPermissions'];
       
      const token = localStorage.getItem("jwt") ?? "";
       
      if(!this.isAuthenticated(token)){
          return this.router.navigate(['SignIn']);
      }
      

      if(this.hasRole(token, roles) || this.hasPermission(token, route.data['allowedPermissions'])){
          return true;
      }

    // Access Denied
      return this.router.navigate(['/Dashboard/AccessDenied']);
  }
}

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> => {
  
  return inject(PermissionsGurdService).canActivate(route, state);

}
