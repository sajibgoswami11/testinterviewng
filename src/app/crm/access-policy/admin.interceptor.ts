import {HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { ok } from 'assert';
import { throwError, of } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor
{
    constructor(private router: Router)
    {}
    intercept(req: HttpRequest<any>, next: HttpHandler): import('rxjs').Observable<HttpEvent<any>> {

        if (localStorage.getItem('userGroup') === 'Cloud Administrator'){
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


