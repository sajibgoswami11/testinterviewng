import {HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent} from '@angular/common/http';
//import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private router: Router)
    {}
    intercept(req: HttpRequest<any>, next: HttpHandler): import('rxjs').Observable<HttpEvent<any>> 
    {
      // tslint:disable-next-line:triple-equals
        if (req.headers.get('No-Auth') == 'True') {
            return next.handle(req.clone());
        }

        if (localStorage.getItem('token') != null) {
        const clonedreq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        });
        return next.handle(clonedreq)
          // .do(
          //   succ => { },
          //   err => {
          //     if (err.status === 401) {
          //       this.router.navigateByUrl('/login');
          //     }
          //   }
          // );
          .pipe(
            tap(
              succ => { },
              err => {
                if (err.status === 401) {
                  this.router.navigateByUrl('/login');
                }
              }
            )
          );
      }
      else {
        this.router.navigateByUrl('/login');
      }

      // Add this return statement
      return next.handle(req);
    }
}
