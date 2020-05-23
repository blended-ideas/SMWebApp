import {Component, Input} from '@angular/core';
import {MarginDataInterface} from '../../../../interfaces/margin.interface';
import {ReportService} from '../../../../services/report.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-margin-card',
  templateUrl: './margin-card.component.html',
  styleUrls: ['./margin-card.component.scss']
})
export class MarginCardComponent {
  @Input() marginData: MarginDataInterface;
  @Input() title: string;
  @Input() substring: string;

  @Input() report_type: string;
  @Input() date_string: string;
  faSpinner = faSpinner;

  isSalesReportLoading: boolean;
  isMarginReportLoading: boolean;

  constructor(private reportService: ReportService) {
  }

  downloadSalesReport() {
    const postObj = {date: this.date_string, report_type: this.report_type};
    this.isSalesReportLoading = true;
    this.reportService.downloadSalesReport(postObj).subscribe(response => {
      this.isSalesReportLoading = false;
      window.open(response.file, '_blank');
    }, () => {
      this.isSalesReportLoading = false;
    });
  }

  downloadMarginReport() {
    const postObj = {date: this.date_string, report_type: this.report_type};
    this.isMarginReportLoading = true;
    this.reportService.downloadMarginReport(postObj).subscribe(response => {
      this.isMarginReportLoading = false;
      console.log(response);
      window.open(response.file, '_blank');
    }, () => {
      this.isMarginReportLoading = false;
    });
  }
}
