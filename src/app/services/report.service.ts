import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {REPORT_APIS} from '../constants/api.constants';
import {Observable} from 'rxjs';
import {MarginInterface} from '../interfaces/margin.interface';
import {ExpiryReportInterface} from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) {
  }

  getDailyReport(params: HttpParams): Observable<MarginInterface> {
    return this.httpClient.get<MarginInterface>(REPORT_APIS.daily, {params});
  }

  downloadExpiryReport(days: number): Observable<ExpiryReportInterface> {
    return this.httpClient.post<ExpiryReportInterface>(REPORT_APIS.product_expiry_report, {days});
  }
}
