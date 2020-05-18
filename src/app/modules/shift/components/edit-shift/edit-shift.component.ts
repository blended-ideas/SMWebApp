import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../../services/session.service';
import {UserInterface} from '../../../../interfaces/user.interface';
import {ShiftService} from '../../../../services/shift.service';
import {ShiftDetailInterface, ShiftEntryInterface} from '../../../../interfaces/shift.interface';
import {Location} from '@angular/common';
import {faCalendar, faCartPlus, faClipboard, faEdit, faSpinner, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {ProductInterface} from '../../../../interfaces/product.interface';
import {concat, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {ProductService} from '../../../../services/product.service';

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.scss']
})
export class EditShiftComponent implements OnInit {
  shift: ShiftDetailInterface;

  allowEdit: boolean;
  isInitialLoading: boolean;
  isEditing: boolean;

  faTimes = faTimes;
  faEdit = faEdit;
  faSpinner = faSpinner;
  faClipBoard = faClipboard;
  faCalender = faCalendar;
  faCartPlus = faCartPlus;

  shiftForm: FormGroup;
  products: Observable<ProductInterface[]>;
  productSearchString = new Subject<string>();
  productsLoading: boolean;
  private user: UserInterface;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private shiftService: ShiftService,
              private fb: FormBuilder,
              private productService: ProductService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.user;
    this.route.paramMap.subscribe(paramMap => {
      this.fetchShift(paramMap.get('shiftId'));
    });
    this.productSearchInit();
  }

  cancel() {
    this.location.back();
  }

  updateShift() {
    const {start_date, start_time, end_date, end_time} = this.shiftForm.value;
    const dateNow = new Date();

    const patchObj = {
      start_dt: new Date(start_date.year, start_date.month - 1, start_date.day, start_time.hour, start_time.minute, start_time.second),
      end_dt: new Date(end_date.year, end_date.month - 1, end_date.day, end_time.hour, end_time.minute, end_time.second),
      entries: this.shiftForm.value.entries
    };
    if (patchObj.start_dt > patchObj.end_dt) {
      alert('End date/time cannot be less than start date/time');
      return;
    }
    if (dateNow < patchObj.start_dt || dateNow < patchObj.end_dt) {
      alert('Start date and end date should be greater than current date-time');
      return;
    }

    this.isEditing = true;
    this.shiftService.updateShift(this.shift.id, patchObj).subscribe(response => {
      console.log(response);
      this.isEditing = false;
    }, error => {
      this.isEditing = false;
      console.log(error);
    });
  }

  getProductControls() {
    return (this.shiftForm.controls.entries as FormArray).controls;
  }

  addProduct(type: 'product' | 'entry', product?: ProductInterface, shiftEntry?: ShiftEntryInterface) {
    const shiftEntries = this.shiftForm.controls.entries as FormArray;

    if (type === 'product') {
      if (shiftEntries.getRawValue().some(e => e.product === product.id)) {
        return;
      }
      shiftEntries.push(this.fb.group({
        product: [product.id],
        product_name: [product.name],
        quantity: [1, [Validators.required, Validators.min(0), Validators.max(product.stock)]],
        condition: 'NEW'
      }));
    } else if (type === 'entry') {
      if (shiftEntries.getRawValue().some(e => e.product === shiftEntry.product)) {
        return;
      }
      shiftEntries.push(this.fb.group({
        id: [shiftEntry.id],
        product: [shiftEntry.product],
        product_name: [shiftEntry.product_name],
        quantity: [shiftEntry.quantity, [
          Validators.required, Validators.min(0), Validators.max(shiftEntry.product_available_stock + shiftEntry.quantity)
        ]],
        condition: 'EDIT'
      }));
    }
  }

  private productSearchInit() {
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

  private fetchShift(shiftId: string) {
    this.isInitialLoading = true;
    this.shiftService.getShiftById(shiftId).subscribe(response => {
      this.shift = response;
      this.isInitialLoading = false;
      this.checkAllowEdit();
      this.buildForm();
    }, () => {
      this.location.back();
      this.isInitialLoading = false;
    });
  }

  private checkAllowEdit() {
    this.allowEdit = this.sessionService.isAdmin() || (!this.shift.approved && this.sessionService.isAuditor());
  }

  private buildForm() {
    const start_dt = new Date(this.shift.start_dt);
    const end_dt = new Date(this.shift.start_dt);
    const startDate: NgbDateStruct = {
      year: start_dt.getFullYear(),
      month: start_dt.getMonth() + 1,
      day: start_dt.getDate()
    };

    const startTime: NgbTimeStruct = {
      hour: start_dt.getHours(),
      minute: start_dt.getMinutes(),
      second: start_dt.getSeconds()
    };

    const endDate: NgbDateStruct = {
      year: end_dt.getFullYear(),
      month: end_dt.getMonth() + 1,
      day: end_dt.getDate()
    };

    const endTime: NgbTimeStruct = {
      hour: end_dt.getHours(),
      minute: end_dt.getMinutes(),
      second: end_dt.getSeconds()
    };

    this.shiftForm = this.fb.group({
      start_date: [startDate, Validators.required],
      start_time: [startTime, Validators.required],
      end_date: [endDate, Validators.required],
      end_time: [endTime, Validators.required],
      entries: this.fb.array([])
    });
    this.shift.entries.forEach(entry => this.addProduct('entry', null, entry));
  }
}
