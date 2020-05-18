import {Component, OnInit} from '@angular/core';
import {ProductInterface, ProductStockChangeInterface} from '../../../../interfaces/product.interface';
import {faEdit, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddRemoveStockComponent} from '../add-remove-stock/add-remove-stock.component';
import {SessionService} from '../../../../services/session.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  faEdit = faEdit;
  faSpinner = faSpinner;

  isLoading: boolean;
  allowEdit: boolean;
  product: ProductInterface;

  productStockChangePaginationHelper = {
    currentPage: 1,
    pageSize: 5,
    totalSize: 0,
  };
  productStockChanges: ProductStockChangeInterface[];

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private sessionService: SessionService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.fetchProduct(paramMap.get('productId'));
    });
  }

  addRemoveStock(action: 'add' | 'remove') {
    const modal = this.modalService.open(AddRemoveStockComponent);
    modal.componentInstance.product = this.product;
    modal.componentInstance.mode = action;

    modal.result.then((response: { psu: ProductStockChangeInterface, new_value: number }) => {
      console.log(response);
      this.product.stock = response.new_value;
      this.getProductStockChanges(1);
    }, () => {
    });
  }

  private getProductStockChanges(page: number) {
    this.productStockChangePaginationHelper.currentPage = page;
    const params = new HttpParams()
      .set('product', this.product.id)
      .set('page', this.productStockChangePaginationHelper.currentPage.toString())
      .set('page_size', this.productStockChangePaginationHelper.pageSize.toString());
    this.productService.getProductStockChanges(params).subscribe(response => {
      this.productStockChanges = response.results;
      this.productStockChangePaginationHelper.totalSize = response.count;
    });
  }

  private fetchProduct(productId: string) {
    this.isLoading = true;

    this.productService.getProductById(productId).subscribe(response => {
      this.product = response;
      this.isLoading = false;
      this.allowEdit = this.sessionService.isAdmin() || this.sessionService.isAuditor();
      this.getProductStockChanges(1);
    });
  }
}
