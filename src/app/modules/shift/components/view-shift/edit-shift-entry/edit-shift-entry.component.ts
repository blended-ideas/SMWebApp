import {Component, Input, OnInit} from '@angular/core';
import {ShiftEntryInterface} from '../../../../../interfaces/shift.interface';
import {ShiftService} from '../../../../../services/shift.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-shift-entry',
  templateUrl: './edit-shift-entry.component.html',
  styleUrls: ['./edit-shift-entry.component.scss']
})
export class EditShiftEntryComponent implements OnInit {
  faSpinner = faSpinner;
  isUpdating: boolean;

  @Input() shiftEntry: ShiftEntryInterface;
  quantity: number;

  updateEntryForm = new FormGroup({
    quantity: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  constructor(
    private shiftService: ShiftService,
    private modal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.updateEntryForm.get('quantity').setValue(this.shiftEntry.quantity);
  }

  onSave() {
    const patchObj = this.updateEntryForm.getRawValue();
    this.isUpdating = true;
    this.shiftService.updateShiftEntry(this.shiftEntry.id, patchObj).subscribe(response => {
      this.isUpdating = false;
      this.modal.close(response);
    }, () => {
      this.isUpdating = false;
    });
  }

}
