import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ShiftDetailInterface} from '../interfaces/shift.interface';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SHIFT_APIS} from '../constants/api.constants';
import {PaginatedResponseInterface} from '../interfaces/paginatedResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private httpClient: HttpClient) {
  }

  getShifts(params?: HttpParams, link?: string): Observable<PaginatedResponseInterface<ShiftDetailInterface>> {
    if (link) {
      return this.httpClient.get<PaginatedResponseInterface<ShiftDetailInterface>>(link);
    }
    return this.httpClient.get<PaginatedResponseInterface<ShiftDetailInterface>>(SHIFT_APIS.detail, {params});
  }

  createShift(postObj: object): Observable<ShiftDetailInterface> {
    return this.httpClient.post<ShiftDetailInterface>(SHIFT_APIS.detail, postObj);
  }

  getShiftById(id: string): Observable<ShiftDetailInterface> {
    return this.httpClient.get<ShiftDetailInterface>(`${SHIFT_APIS.detail}${id}/`);
  }

  approveShift(shiftId: string) {
    return this.httpClient.patch<ShiftDetailInterface>(`${SHIFT_APIS.detail}${shiftId}/${SHIFT_APIS.approve}/`, {});
  }

  closeShift(shiftId: string) {
    return this.httpClient.patch<ShiftDetailInterface>(`${SHIFT_APIS.detail}${shiftId}/${SHIFT_APIS.close_shift}/`, {});
  }

  updateShift(shiftId: string, patchObj: object) {
    return this.httpClient.patch<ShiftDetailInterface>(`${SHIFT_APIS.detail}${shiftId}/`, patchObj);
  }

  addProductsToShift(shiftId: string, products: object) {
    return this.httpClient.patch<ShiftDetailInterface>(`${SHIFT_APIS.detail}${shiftId}/${SHIFT_APIS.add_products}/`, products);
  }
}
