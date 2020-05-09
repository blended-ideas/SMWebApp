import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ShiftDetailInterface} from '../interfaces/shift.interface';
import {HttpClient} from '@angular/common/http';
import {SHIFT_APIS} from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private httpClient: HttpClient) {
  }

  createShift(postObj: object): Observable<ShiftDetailInterface> {
    return this.httpClient.post<ShiftDetailInterface>(SHIFT_APIS.detail, postObj);
  }
}
