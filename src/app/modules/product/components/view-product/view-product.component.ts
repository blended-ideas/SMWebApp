import {Component, Input} from '@angular/core';
import {ProductInterface} from '../../../../interfaces/product.interface';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {
  @Input() product: ProductInterface;
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private modal: NgbActiveModal) {
  }

  cancel() {
    this.modal.dismiss();
  }
}
