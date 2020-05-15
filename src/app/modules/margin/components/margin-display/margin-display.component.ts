import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {NgbDate, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faCalendar, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ReportService} from '../../../../service/report.service';
import {HttpParams} from '@angular/common/http';
import {MarginInterface} from '../../../../interfaces/margin.interface';

@Component({
  selector: 'app-margin-display',
  templateUrl: './margin-display.component.html',
  styleUrls: ['./margin-display.component.scss']
})
export class MarginDisplayComponent implements OnInit {
  faCalendar = faCalendar;
  faSpinner = faSpinner;

  selectedDay: Date;
  selectedDayRaw: NgbDateStruct;

  isLoading = true;
  margin: MarginInterface;

  dayString: string;
  weekString: string;
  monthString: string;
  quarterString: string;

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
      }

      const momentObj = moment(this.selectedDay);
      this.dayString = momentObj.format('DD/MM/yyyy');
      this.weekString = momentObj.startOf('week').format('DD/MM/yyyy') + ' - ' + momentObj.endOf('week').format('DD/MM/yyyy');
      this.monthString = momentObj.startOf('month').format('DD/MM/yyyy') + ' - ' + momentObj.endOf('month').format('DD/MM/yyyy');
      this.quarterString = momentObj.startOf('quarter').format('DD/MM/yyyy') + ' - ' + momentObj.endOf('quarter').format('DD/MM/yyyy');

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
      this.margin = response;
    });
  }
}
