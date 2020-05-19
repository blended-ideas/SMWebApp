import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface} from '../../../../interfaces/product.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/product.service';
import * as moment from 'moment';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {SessionService} from '../../../../services/session.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-expiry-date',
  templateUrl: './add-expiry-date.component.html',
  styleUrls: ['./add-expiry-date.component.scss']
})
export class AddExpiryDateComponent implements OnInit {
  faSpinner = faSpinner;

  @Input() product: ProductInterface;
  expiryForm: FormGroup;
  isAdding: boolean;
  minDate: NgbDateStruct;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private modal: NgbActiveModal,
    private sessionService: SessionService) {
  }

  ngOnInit(): void {
    let dt = moment();
    this.minDate = {year: dt.year(), month: dt.month() + 1, day: dt.date()};
    dt = dt.add('7', 'days');
    const dateRaw: NgbDateStruct = {year: dt.year(), month: dt.month() + 1, day: dt.date()};
    this.expiryForm = this.fb.group({
      user: this.sessionService.user.id,
      product: this.product.id,
      datetime: [dateRaw, Validators.required],
    });
  }

  addExpiry() {
    const postObj = this.expiryForm.getRawValue();
    postObj.datetime = new Date(postObj.datetime.year, postObj.datetime.month - 1, postObj.datetime.day);
    this.isAdding = true;
    this.productService.postExpiry(postObj).subscribe(response => {
      this.isAdding = false;
      this.modal.close(response);
    }, error => {
      this.isAdding = false;
    });
  }

  dismiss() {
    this.modal.dismiss();
  }
}
