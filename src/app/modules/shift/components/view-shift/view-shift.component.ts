import {Component, OnInit} from '@angular/core';
import {ShiftService} from '../../../../services/shift.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ShiftDetailInterface, ShiftEntryInterface} from '../../../../interfaces/shift.interface';
import {faCheck, faEdit, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {SessionService} from '../../../../services/session.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddProductsToShiftComponent} from './add-products-to-shift/add-products-to-shift.component';
import {EditShiftEntryComponent} from './edit-shift-entry/edit-shift-entry.component';

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
  isAuditor: boolean;
  isAdmin: boolean;

  constructor(private shiftService: ShiftService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private modal: NgbModal,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('shiftId')) {
        this.location.back();
      }
      this.fetchShiftDetails(paramMap.get('shiftId'), true);
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
      this.computeShiftEntryValues();
      alert('Shift Approved');
    });
  }

  closeShift() {
    if (!confirm('Close Shift?')) {
      return;
    }
    this.shiftService.closeShift(this.shiftDetail.id).subscribe(response => {
      this.shiftDetail = response;
      this.computeShiftEntryValues();
      alert('Shift Closed. Waiting for approval');
    });
  }

  addProductsToShift() {
    const modal = this.modal.open(AddProductsToShiftComponent, {backdrop: 'static', keyboard: false});
    modal.componentInstance.shift = this.shiftDetail;
    modal.result.then((response: ShiftDetailInterface) => {
      this.shiftDetail = response;
      this.shiftDetail.entries.forEach(entry => {
        entry.entry_total = entry.price * entry.quantity;
      });
    }, () => {

    });
  }

  startEntryEdit(shiftEntry: ShiftEntryInterface) {
    const modal = this.modal.open(EditShiftEntryComponent);
    modal.componentInstance.shiftEntry = shiftEntry;

    modal.result.then((se: ShiftEntryInterface) => {
      const index = this.shiftDetail.entries.findIndex(s => s.id === se.id);
      if (index > -1) {
        this.fetchShiftDetails(this.shiftDetail.id);
      }
    });
  }

  private fetchShiftDetails(shiftId: string, updateLoading = false) {
    if (updateLoading) {
      this.isLoading = true;
    }

    this.shiftService.getShiftById(shiftId).subscribe(response => {
      this.shiftDetail = response;
      this.computeShiftEntryValues();
      this.isLoading = false;
    }, error => {
      if (error.status === 403) {
        this.location.back();
      }
      this.isLoading = false;
    });
  }

  private computeShiftEntryValues() {
    this.shiftDetail.entries.forEach(entry => {
      entry.entry_total = entry.price * entry.quantity;
    });
  }
}
