import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../../services/product.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {concat, Observable, of, Subject} from 'rxjs';
import {ProductInterface} from '../../../../../interfaces/product.interface';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {ShiftService} from '../../../../../services/shift.service';
import {ShiftDetailInterface} from '../../../../../interfaces/shift.interface';

@Component({
  selector: 'app-add-products-to-shift',
  templateUrl: './add-products-to-shift.component.html',
  styleUrls: ['./add-products-to-shift.component.scss']
})
export class AddProductsToShiftComponent implements OnInit {
  @Input() shift: ShiftDetailInterface;

  faTimes = faTimes;

  productListForm: FormGroup;

  products$: Observable<ProductInterface[]>;
  productSearchString$ = new Subject<string>();
  productsLoading: boolean;

  constructor(private productService: ProductService,
              private shiftService: ShiftService,
              private modal: NgbActiveModal,
              private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.productListForm = this.fb.group({
      entries: this.fb.array([])
    });

    this.productSearchInit();
  }

  addProductToShiftList() {
    // TODO: Make Call to backend
    const productArray = this.productListForm.value.entries.map(entry => ({
      product: entry.product.id,
      quantity: entry.quantity,
    }));
    this.shiftService.addProductsToShift(this.shift.id, {entries: productArray}).subscribe(response => {
      this.modal.close(response);
    }, (error) => {
      console.log(error);
    });
  }

  productSearchInit() {
    this.products$ = concat(
      of<ProductInterface[]>([]),
      this.productSearchString$.pipe(
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

  removeProductEntry(index: number) {
    (this.productListForm.controls.entries as FormArray).removeAt(index);
  }

  getProductControls(): AbstractControl[] {
    return (this.productListForm.controls.entries as FormArray).controls;
  }

  addProduct(product: ProductInterface) {
    if (product) {
      const shiftEntries = this.productListForm.controls.entries as FormArray;
      if (shiftEntries.getRawValue().some(e => e.product.id === product.id)) {
        return;
      }

      shiftEntries.push(this.fb.group({
        product: [product],
        quantity: [1, [Validators.required, Validators.min(1)]]
      }));
    }
  }

  dismiss() {
    this.modal.dismiss();
  }
}
