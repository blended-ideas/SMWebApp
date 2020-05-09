import {Component, OnInit} from '@angular/core';
import {
  faEdit,
  faPlusSquare,
  faSearch,
  faSortAlphaDown,
  faSortAlphaUp,
  faSortAmountDown,
  faSortAmountUp,
  faSortNumericDown,
  faSortNumericUp,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import {ProductInterface} from '../../../../interfaces/product.interface';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {ProductService} from '../../../../services/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faEdit = faEdit;
  faSpinner = faSpinner;

  searchText: string;
  sortContext: { name: string, icon: IconDefinition, value: string };
  isLoading: boolean;
  products: ProductInterface[] = [];

  sortValues = [
    {name: 'Name', icon: faSortAlphaUp, value: 'name'},
    {name: 'Name', icon: faSortAlphaDown, value: '-name'},
    {name: 'Price', icon: faSortAmountUp, value: 'price'},
    {name: 'Price', icon: faSortAmountDown, value: '-price'},
    {name: 'Stock', icon: faSortNumericDown, value: 'stock'},
    {name: 'Stock', icon: faSortNumericUp, value: '-stock'},
  ];

  paginationHelper = {
    currentPage: 1,
    pageSize: 10,
    totalSize: 0
  };

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private modal: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.fetchProducts(null, queryParamMap);
    });
  }

  changeQueryParam(paramType: 'search' | 'sort' | 'page', paramValue: string | number) {
    const queryParams = {
      page: this.paginationHelper.pageSize,
      sort: this.sortContext.value,
      search: this.searchText
    };

    switch (paramType) {
      case 'page':
        queryParams.page = paramValue as number;
        break;
      case 'search':
        queryParams.page = 1;
        queryParams.search = paramValue as string;
        break;
      case 'sort':
        queryParams.page = 1;
        queryParams.sort = paramValue as string;
        break;
    }
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams
    });
  }

  private fetchProducts(link: string, queryParamMap?: ParamMap) {
    this.isLoading = true;
    let params = new HttpParams().set('page_size', this.paginationHelper.pageSize.toString());

    if (queryParamMap.has('search')) {
      this.searchText = queryParamMap.get('search');
      params = params.set('search', this.searchText);
    }

    if (queryParamMap.has('page')) {
      this.paginationHelper.currentPage = Number(queryParamMap.get('page'));
      params = params.set('page', this.paginationHelper.currentPage.toString());
    }

    if (queryParamMap.has('sort')) {
      const sortString = queryParamMap.get('sort');
      this.sortContext = this.sortValues.find(sv => sv.value === sortString);
    }
    this.sortContext = this.sortContext || this.sortValues[0];
    params = params.set('ordering', this.sortContext.value);

    this.productService.getProducts(params, link)
      .subscribe(response => {
        this.products = response.results;
        this.paginationHelper.totalSize = response.count;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }

}
