import {Component, OnInit} from '@angular/core';
import {ProductInterface} from '../../../../interfaces/product.interface';
import {faEdit, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  faEdit = faEdit;
  faSpinner = faSpinner;

  isLoading: boolean;
  product: ProductInterface;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.fetchProduct(paramMap.get('productId'));
    });
  }

  private fetchProduct(productId: string) {
    this.isLoading = true;

    this.productService.getProductById(productId).subscribe(response => {
      this.product = response;
      this.isLoading = false;
    });
  }
}
