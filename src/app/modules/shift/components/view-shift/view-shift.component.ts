import {Component, OnInit} from '@angular/core';
import {ShiftService} from '../../../../services/shift.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ShiftDetailInterface} from '../../../../interfaces/shift.interface';
import {faCheck, faEdit, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {SessionService} from '../../../../services/session.service';

@Component({
  selector: 'app-view-shift',
  templateUrl: './view-shift.component.html',
  styleUrls: ['./view-shift.component.scss']
})
export class ViewShiftComponent implements OnInit {
  shiftDetail: ShiftDetailInterface;

  faSpinner = faSpinner;
  faEdit = faEdit;
  faCheck = faCheck;

  isLoading: boolean;
  allowEdit: boolean;
  isAuditor: boolean;
  isAdmin: boolean;

  constructor(private shiftService: ShiftService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('shiftId')) {
        this.location.back();
      }
      this.fetchShiftDetails(paramMap.get('shiftId'));
    });

    this.isAuditor = this.sessionService.isAuditor();
    this.isAdmin = this.sessionService.isAdmin();
  }

  cancel() {
    this.location.back();
  }

  approveShift() {
    if (!confirm('Approve Shift?')) {
      return;
    }
    this.shiftService.approveShift(this.shiftDetail.id).subscribe(response => {
      this.shiftDetail = response;
      this.checkAllowEdit();
      alert('Shift Approved');
    });
  }

  private fetchShiftDetails(shiftId: string) {
    this.isLoading = true;
    this.shiftService.getShiftById(shiftId).subscribe(response => {
      this.shiftDetail = response;
      this.shiftDetail.entries.forEach(entry => {
        entry.entry_total = entry.price * entry.quantity;
      });
      this.checkAllowEdit();
      this.isLoading = false;
    }, error => {
      if (error.status === 403) {
        this.location.back();
      }
      this.isLoading = false;
    });
  }

  private checkAllowEdit() {
    this.allowEdit = (this.sessionService.isAuditor() && !this.shiftDetail.approved) || this.sessionService.isAdmin();
  }
}
