import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductExpiryDateInterface, ProductInterface} from '../../../interfaces/product.interface';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ProductService} from '../../../services/product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-expiry-date',
  templateUrl: './edit-expiry-date.component.html',
  styleUrls: ['./edit-expiry-date.component.scss']
})
export class EditExpiryDateComponent implements OnInit {
  faSpinner = faSpinner;

  @Input() productExpiryDate: ProductExpiryDateInterface;
  @Input() product: ProductInterface;

  expiryForm: FormGroup;
  isAdding: boolean;
  minDate: NgbDateStruct;

  constructor(private modal: NgbActiveModal,
              private productService: ProductService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const minDate = moment.min(moment(this.productExpiryDate.datetime), moment());
    this.minDate = {year: minDate.year(), month: minDate.month() + 1, day: minDate.date()};

    const dt = new Date(this.productExpiryDate.datetime);
    const dateRaw: NgbDateStruct = {year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate()};
    this.expiryForm = this.fb.group({
      datetime: [dateRaw, Validators.required],
    });
  }

  editExpiry() {
    this.isAdding = true;
    const dateTime = this.expiryForm.getRawValue().datetime as NgbDateStruct;
    this.productService.patchExpiry(this.productExpiryDate.id, {
      datetime: new Date(dateTime.year, dateTime.month, dateTime.day)
    }).subscribe(response => {
      this.modal.close(response);
      this.isAdding = false;
    }, () => {
      this.isAdding = false;
    });
  }

  dismiss() {
    this.modal.dismiss();
  }
}
