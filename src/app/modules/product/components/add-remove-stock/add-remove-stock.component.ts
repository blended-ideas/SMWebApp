import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface, ProductStockChangeInterface} from '../../../../interfaces/product.interface';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../../../../services/session.service';
import {ProductService} from '../../../../services/product.service';
import {Observable} from 'rxjs';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-remove-stock',
  templateUrl: './add-remove-stock.component.html',
  styleUrls: ['./add-remove-stock.component.scss']
})
export class AddRemoveStockComponent implements OnInit {
  @Input() product: ProductInterface;
  @Input() mode: 'add' | 'remove';

  stockAfterUpdate = 0;
  stockChangeForm: FormGroup;

  isUpdating: boolean;
  faSpinner = faSpinner;

  constructor(private modal: NgbActiveModal,
              private sessionService: SessionService,
              private productService: ProductService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const changeValueValidator = [Validators.min(1)];
    if (this.mode === 'remove') {
      changeValueValidator.push(Validators.max(this.product.stock));
    }
    this.stockChangeForm = this.fb.group({
      changeValue: [0, changeValueValidator]
    });

    this.stockChangeForm.controls.changeValue.valueChanges.subscribe(value => {
      this.stockAfterUpdate = Number(this.product.stock) + ((this.mode === 'add' ? 1 : -1) * Number(value));
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  updateStock() {
    this.isUpdating = true;
    let request: Observable<{ psu: ProductStockChangeInterface, new_stock: number }>;

    if (this.mode === 'add') {
      request = this.productService.addStock(this.product.id, this.stockChangeForm.value);
    } else if (this.mode === 'remove') {
      request = this.productService.reduceStock(this.product.id, this.stockChangeForm.value);
    } else {
      return;
    }

    request.subscribe(response => {
      alert('Stock Added');
      this.isUpdating = false;
      this.modal.close(response);
    }, er => {
      let errStr = 'Something went wrong while updating the stock';
      if (er.status === 400) {
        const keys = Object.keys(er.error);
        errStr = er.error[keys[0]][0];
      }
      alert(errStr);
      this.isUpdating = false;
    });
  }
}
