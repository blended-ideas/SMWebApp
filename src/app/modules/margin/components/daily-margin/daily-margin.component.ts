import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {NgbDate, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faCalendar, faRupeeSign} from '@fortawesome/free-solid-svg-icons';
import {ReportService} from '../../../../service/report.service';
import {HttpParams} from '@angular/common/http';
import {MarginInterface} from '../../../../interfaces/margin.interface';

@Component({
  selector: 'app-daily-margin',
  templateUrl: './daily-margin.component.html',
  styleUrls: ['./daily-margin.component.scss']
})
export class DailyMarginComponent implements OnInit {
  faCalendar = faCalendar;
  faRupeeSign = faRupeeSign;

  selectedDay: Date;
  selectedDayRaw: NgbDateStruct;

  isLoading = true;
  dayMargin: MarginInterface;

  constructor(private route: ActivatedRoute,
              private modal: NgbModal,
              private reportService: ReportService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      if (queryParamMap.has('day')) {
        this.selectedDay = moment(queryParamMap.get('day')).toDate();
      } else {
        this.selectedDay = moment()
          .hours(0)
          .minutes(0)
          .seconds(0)
          .milliseconds(0).toDate();
        console.log('We are here', this.selectedDay);
      }

      this.selectedDayRaw = {
        day: this.selectedDay.getDay(),
        month: this.selectedDay.getMonth() + 1,
        year: this.selectedDay.getFullYear()
      };

      this.getDayMargin();
    });
  }

  onDateSelection($event: NgbDate) {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        day: moment().year($event.year)
          .month($event.month - 1)
          .date($event.day)
          .hours(0)
          .minutes(0)
          .seconds(0)
          .toISOString()
      }
    });
  }

  private getDayMargin() {
    this.isLoading = true;
    const params = new HttpParams()
      .set('day', this.selectedDay.toISOString());
    this.reportService.getDailyReport(params).subscribe(response => {
      this.isLoading = false;
      this.dayMargin = response;
    });
  }
}
