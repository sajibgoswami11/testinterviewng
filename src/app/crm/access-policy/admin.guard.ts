import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  constructor(private router: Router)
  {
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if ( localStorage.getItem('userGroup') === 'Cloud Administrator'){
        return true;
      }
      else
      {
        // this.router.navigate(['/']);
        return false;
      }
  }
}



