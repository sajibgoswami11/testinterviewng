import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TeamLeadInterceptor implements  HttpInterceptor
{
    constructor(private router: Router)
    {}
    intercept(req: HttpRequest<any>, next: HttpHandler): import('rxjs').Observable<HttpEvent<any>> {

        if ( localStorage.getItem('userGroup') !== 'User(TaskManagement)'){
            return ok(localStorage.getItem('username') );
        }
        else{
          return unauthorized();
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }
        // tslint:disable-next-line: no-shadowed-variable
        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }
    }
}
