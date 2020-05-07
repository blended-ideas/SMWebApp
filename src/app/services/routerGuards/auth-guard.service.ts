import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {isPlatformServer} from '@angular/common';
import {SessionService} from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private router: Router,
              private sessionService: SessionService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuth(state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuth(state);
  }

  private checkAuth(state: RouterStateSnapshot) {
    if (isPlatformServer(this.platformId)) {
      this.router.navigate(['/server-load'], {queryParams: {returnUrl: state.url}});
      return false;
    } else {
      if (!this.sessionService.isLoggedIn()) {
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      } else {
        return true;
      }
    }
  }
}
