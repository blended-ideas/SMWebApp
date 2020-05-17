import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {AuthTokenInterface} from '../interfaces/authToken.interface';
import {UserInterface} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly TOKEN_KEY: string = 'INVOICE101_TOKEN';
  private readonly USER_KEY: string = 'INVOICE101_USER';
  private emptyToken: AuthTokenInterface = {
    access: null,
    refresh: null
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this._user = JSON.parse(localStorage.getItem(this.USER_KEY)) as UserInterface;
      this._token = JSON.parse(localStorage.getItem(this.TOKEN_KEY)) || this.emptyToken;
    } else {
      this._user = null;
      this._token = this.emptyToken;
    }
  }

  private _user: UserInterface;

  get user(): UserInterface {
    return this._user;
  }

  set user(value: UserInterface) {
    this._user = value;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(this._user));
    }
  }

  private _token: AuthTokenInterface;

  get token(): AuthTokenInterface {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._token) {
        this._token = JSON.parse(localStorage.getItem(this.TOKEN_KEY)) || this.emptyToken;
      }
      return this._token;
    }
    return this.emptyToken;
  }

  set token(token: AuthTokenInterface) {
    this._token = token;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(this._token));
    }
  }

  clear(): void {
    this._user = null;
    this._token = this.emptyToken;
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return Boolean(this._token.access);
  }

  isAdmin(): boolean {
    return this.user?.roles.some(r => r.label === 'admin');
  }

  isAuditor(): boolean {
    return this.user?.roles.some(r => r.label === 'auditor');
  }

  isShiftWorker(): boolean {
    return this.user?.roles.some(r => r.label === 'shiftworker');
  }
}
