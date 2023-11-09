import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGurdService {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  isAuthenticated(token: string):boolean{
      if(token && token !== "null" && token.length != 0 && !this.jwtHelper.isTokenExpired(token)){
          return true;
      }

      return false;
  }

  hasRole(token: string, allowedRoles: string[]){
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken);

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

    if(allowedPermissions === undefined)
      return true;

    for(let key in decodedToken){
      if(key.includes("permission")){
          return allowedPermissions.some(permission => decodedToken[key].includes(permission));
      }
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
      const roles = route.data['allowedRoles'];
      const permissions = route.data['allowedPermissions'];

      const token = localStorage.getItem("jwt") ?? "";

      if(!this.isAuthenticated(token)){
          return this.router.navigate(['login']);
      }

      if(this.hasRole(token, roles) && this.hasPermission(token, permissions)){
          return true;
      }

      return this.router.navigate(['']);
  }
}

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> => {
  return inject(PermissionsGurdService).canActivate(route, state);

}
