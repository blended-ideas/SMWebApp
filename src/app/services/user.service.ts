import {Injectable} from '@angular/core';
import {UserInterface, UserRoleInterface} from '../interfaces/user.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
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

  getUsers(): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>(USER_APIS.user);
  }

  createUser(postObj: object): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(USER_APIS.user, postObj);
  }

  updateUser(id: number, postObj: object): Observable<UserInterface> {
    return this.httpClient.patch<UserInterface>(`${USER_APIS.user}${id}/`, postObj);
  }

}
