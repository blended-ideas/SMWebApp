import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
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
    console.log(this.sessionService.isLoggedIn());
    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    } else {
      return true;
    }
  }
}
