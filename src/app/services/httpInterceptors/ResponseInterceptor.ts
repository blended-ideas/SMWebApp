/**
 * Created by karthik on 18/9/17.
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {
    }, (error) => {
      if ([401, 403].indexOf(error.status) > -1 && window.location.href.indexOf('login') === -1) {
        this.router.navigate(['/login']);
      }
    }));
  }
}
