import {Component, OnInit} from '@angular/core';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ProductExpiryDateInterface} from '../../interfaces/product.interface';
import {HttpParams} from '@angular/common/http';
import {ProductService} from '../../services/product.service';
import {ReportService} from '../../services/report.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faSpinner = faSpinner;

  productExpiryDatePaginationHelper = {
    currentPage: 1,
    pageSize: 5,
    totalSize: 0,
  };
  productExpiryLoading: boolean;
  productExpiryDates: ProductExpiryDateInterface[];

  isReportDownloading: boolean;

  constructor(private productService: ProductService,
              private location: Location,
              private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.getProductExpiryDates(1);
  }

  getProductExpiryDates(pageNumber: number) {
    this.productExpiryDatePaginationHelper.currentPage = pageNumber;
    const params = new HttpParams()
      .set('page', this.productExpiryDatePaginationHelper.currentPage.toString())
      .set('page_size', this.productExpiryDatePaginationHelper.pageSize.toString())
      .set('after_today', 'true')
      .set('home_display', 'true');
    this.productExpiryLoading = true;
    this.productService.getProductExpiryDates(params).subscribe(response => {
      this.productExpiryLoading = false;
      this.productExpiryDates = response.results;
      this.productExpiryDatePaginationHelper.totalSize = response.count;
    }, () => {
      this.productExpiryLoading = false;
    });
  }

  downloadExpiryReport() {
    const NO_DAYS = 10;
    this.isReportDownloading = true;
    this.reportService.downloadExpiryReport(NO_DAYS).subscribe(response => {
      window.open(response.file, '_blank');
      this.isReportDownloading = false;
    }, () => {
      this.isReportDownloading = false;
    });
  }
}
