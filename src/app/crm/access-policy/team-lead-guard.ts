import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamLeadGuard implements CanActivateChild {
    theRole: any;
      constructor(){ }

      canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
          if ( localStorage.getItem('userGroup') !== 'User(TaskManagement)'){
             return true;
          }
          else{
            return false;
          }
      }
}
