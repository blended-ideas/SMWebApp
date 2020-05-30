import {Injectable} from '@angular/core';
import {UserInterface, UserRoleInterface} from '../interfaces/user.interface';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {shareReplay} from 'rxjs/operators';
import {USER_APIS} from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _getRoles: Observable<UserRoleInterface[]>;

  constructor(private httpClient: HttpClient) {
    this._getRoles = this.httpClient.get<UserRoleInterface[]>(USER_APIS.roles).pipe(shareReplay());
  }

  getRoles(): Observable<UserRoleInterface[]> {
    return this._getRoles;
  }

  getUsers(params?: HttpParams): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>(USER_APIS.user, {params});
  }

  createUser(postObj: object): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(USER_APIS.user, postObj);
  }

  updateUser(id: number, postObj: object): Observable<UserInterface> {
    return this.httpClient.patch<UserInterface>(`${USER_APIS.user}${id}/`, postObj);
  }

  updateUserPassword(id: number, postObj: object): Observable<any> {
    return this.httpClient.post(`${USER_APIS.user}${id}/${USER_APIS.update_user_password}`, postObj);
  }
}
