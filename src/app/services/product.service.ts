import {Injectable} from '@angular/core';
import {ProductExpiryDateInterface, ProductInterface, ProductStockChangeInterface} from '../interfaces/product.interface';
import {PRODUCT_APIS} from '../constants/api.constants';
import {Observable} from 'rxjs';
import {PaginatedResponseInterface} from '../interfaces/paginatedResponse.interface';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) {
  }

  getProducts(params?: HttpParams, link?: string): Observable<PaginatedResponseInterface<ProductInterface>> {
    if (link) {
      return this.httpClient.get<PaginatedResponseInterface<ProductInterface>>(link);
    }
    return this.httpClient.get<PaginatedResponseInterface<ProductInterface>>(PRODUCT_APIS.product, {params});
  }

  createProducts(postObj: object): Observable<ProductInterface> {
    return this.httpClient.post<ProductInterface>(PRODUCT_APIS.product, postObj);
  }

  updateProduct(id: string, patchObj: object): Observable<ProductInterface> {
    return this.httpClient.patch<ProductInterface>(PRODUCT_APIS.product + id + '/', patchObj);
  }

  getProductById(id: string): Observable<ProductInterface> {
    return this.httpClient.get<ProductInterface>(`${PRODUCT_APIS.product}${id}/`);
  }

  addStock(productId: string, postBody: object): Observable<{ psu: ProductStockChangeInterface, new_stock: number }> {
    return this.httpClient.post<{ psu: ProductStockChangeInterface, new_stock: number }>(`${PRODUCT_APIS.product}${productId}/${PRODUCT_APIS.add_stock}`, postBody);
  }

  reduceStock(productId: string, postBody: object): Observable<{ psu: ProductStockChangeInterface, new_stock: number }> {
    return this.httpClient.post<{ psu: ProductStockChangeInterface, new_stock: number }>(`${PRODUCT_APIS.product}${productId}/${PRODUCT_APIS.reduce_stock}`, postBody);
  }

  getProductStockChanges(params?: HttpParams, link?: string): Observable<PaginatedResponseInterface<ProductStockChangeInterface>> {
    if (link) {
      return this.httpClient.get<PaginatedResponseInterface<ProductStockChangeInterface>>(link);
    }
    return this.httpClient.get<PaginatedResponseInterface<ProductStockChangeInterface>>(PRODUCT_APIS.product_stock_change, {params});
  }


  // Expiry Dates --------------------------------------------------------
  getProductExpiryDates(params?: HttpParams, link?: string): Observable<PaginatedResponseInterface<ProductExpiryDateInterface>> {
    if (link) {
      return this.httpClient.get<PaginatedResponseInterface<ProductExpiryDateInterface>>(link);
    }
    return this.httpClient.get<PaginatedResponseInterface<ProductExpiryDateInterface>>(PRODUCT_APIS.product_expiry, {params});
  }

  postExpiry(postObj): Observable<ProductExpiryDateInterface> {
    return this.httpClient.post<ProductExpiryDateInterface>(PRODUCT_APIS.product_expiry, postObj);
  }

  patchExpiry(id: number, patchData: object): Observable<ProductExpiryDateInterface> {
    return this.httpClient.patch<ProductExpiryDateInterface>(PRODUCT_APIS.product_expiry + id.toString() + '/', patchData);
  }
}
