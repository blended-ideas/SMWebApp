import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {faCalendar, faClipboard, faPlusSquare, faSpinner, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {ProductInterface} from '../../../../interfaces/product.interface';
import {concat, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {ProductService} from '../../../../services/product.service';
import {SessionService} from '../../../../services/session.service';
import {ShiftService} from '../../../../services/shift.service';

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
  faClipBoard = faClipboard;

  shiftForm: FormGroup;

  today = new Date();
  maxDate: NgbDateStruct;

  products: Observable<ProductInterface[]>;
  productSearchString = new Subject<string>();
  productsLoading: boolean;

  isCreating: boolean;

  constructor(private location: Location,
              private productService: ProductService,
              private sessionService: SessionService,
              private shiftService: ShiftService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();

    this.maxDate = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    };
    this.productSearchInit();
  }

  productSearchInit() {
    this.products = concat(
      of<ProductInterface[]>([]),
      this.productSearchString.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.productsLoading = true),
        switchMap(term => {
          const params = new HttpParams().set('search', term);
          return this.productService.getProducts(params)
            .pipe(
              map(resp => resp.results),
              catchError(() => of([])),
              tap(() => this.productsLoading = false)
            );
        })
      )
    );
  }

  cancel() {
    if ('Cancel Shift Creation?') {
      this.location.back();
    }
  }

  createShift() {
    const formValue = this.shiftForm.getRawValue();
    const start_dt = new Date(
      formValue.start_date.year,
      formValue.start_date.month - 1,
      formValue.start_date.day,
      formValue.start_time.hour,
      formValue.start_time.minute
    );
    const end_dt = new Date(
      formValue.end_date.year,
      formValue.end_date.month - 1,
      formValue.end_date.day,
      formValue.end_time.hour,
      formValue.end_time.minute
    );
    const dateNow = new Date();

    if (start_dt > end_dt) {
      alert('End date/time cannot be less than start date/time');
      return;
    }
    if (dateNow < start_dt || dateNow < end_dt) {
      alert('Start date and end date should be greater than current date-time');
      return;
    }

    const postObj = {
      user: this.sessionService.user.id,
      start_dt: start_dt.toISOString(),
      end_dt: end_dt.toISOString(),
      entries: formValue.entries.map(e => ({product: e.product.id, quantity: e.quantity}))
    };

    this.isCreating = true;
    this.shiftService.createShift(postObj).subscribe(() => {
      alert('Shift Added');
      this.isCreating = false;
      this.location.back();
    }, () => {
      this.isCreating = false;
    });
  }

  addProduct(product: ProductInterface) {
    if (product) {
      const shiftEntries = this.shiftForm.controls.entries as FormArray;
      if (shiftEntries.getRawValue().some(e => e.product.id === product.id)) {
        return;
      }

      shiftEntries.push(this.fb.group({
        product: [product],
        quantity: [1, [Validators.required, Validators.min(1), Validators.max(product.stock)]]
      }));
    }
  }

  getProductControls() {
    return (this.shiftForm.controls.entries as FormArray).controls;
  }

  private buildForm() {
    const defaultDate: NgbDateStruct = {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate()
    };

    const defaultTime: NgbTimeStruct = {
      hour: this.today.getHours(),
      minute: this.today.getMinutes(),
      second: this.today.getSeconds()
    };

    this.shiftForm = this.fb.group({
      start_date: [defaultDate, Validators.required],
      start_time: [defaultTime, Validators.required],
      end_date: [defaultDate, Validators.required],
      end_time: [defaultTime, Validators.required],
      entries: this.fb.array([])
    });
  }
}
