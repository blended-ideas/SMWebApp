/**
 * Created by karthik on 18/9/17.
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {
    }, (error) => {
      if ([410, 403].indexOf(error.status) > -1 && window.location.href.indexOf('login') === -1) {
        this.authService.clearCredentials();
        this.router.navigate(['/login']);
      }
    }));
  }
}
