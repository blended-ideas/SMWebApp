import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {faCalendar, faPlusSquare, faSpinner, faTimes} from '@fortawesome/free-solid-svg-icons';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../../../services/product.service';
import {SessionService} from '../../../../services/session.service';
import {ShiftService} from '../../../../services/shift.service';
import {SHIFT_TIMINGS, ShiftSelectionInterface} from '../../../../constants/shift.constants';
import * as moment from 'moment';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.scss']
})
export class CreateShiftComponent implements OnInit {
  faTimes = faTimes;
  faPlusSquare = faPlusSquare;
  faSpinner = faSpinner;
  faCalender = faCalendar;

  today = new Date();
  maxDate: NgbDateStruct;
  shiftDate: NgbDateStruct;
  SHIFT_TIMINGS = SHIFT_TIMINGS;
  selectedShiftTiming = SHIFT_TIMINGS[0];
  shiftView: {
    startTime: Date
    endTime: Date
  };

  isCreating: boolean;

  constructor(private location: Location,
              private productService: ProductService,
              private sessionService: SessionService,
              private shiftService: ShiftService,
              private router: Router,
              private modal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.maxDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    };
    this.shiftDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    };
    this.shiftChange(this.shiftDate, this.selectedShiftTiming);
  }


  createShift() {
    const dateNow = new Date();

    if (this.shiftView.startTime > this.shiftView.endTime) {
      alert('End date/time cannot be less than start date/time');
      return;
    }
    if (dateNow < this.shiftView.startTime || dateNow < this.shiftView.endTime) {
      alert('Start date and end date should be greater than current date-time');
      return;
    }

    const postObj = {
      user: this.sessionService.user.id,
      start_dt: this.shiftView.startTime.toISOString(),
      end_dt: this.shiftView.endTime.toISOString(),
      entries: []
    };

    this.isCreating = true;
    this.shiftService.createShift(postObj).subscribe(response => {
      alert('Shift Added');
      this.isCreating = false;
      this.modal.close();
      this.router.navigate(['shift', response.id, 'edit']);
    }, () => {
      this.isCreating = false;
    });
  }


  shiftChange(dateStruct: NgbDateStruct, shiftTime: ShiftSelectionInterface) {
    const strtDate = new Date(
      dateStruct.year,
      dateStruct.month - 1,
      dateStruct.day,
      shiftTime.time_start_hour,
      0,
      0);

    this.shiftView = {
      startTime: strtDate,
      endTime: (moment(strtDate).add(shiftTime.number_of_hours, 'hours')).toDate()
    };
  }

  dismiss() {
    this.modal.dismiss();
  }
}
