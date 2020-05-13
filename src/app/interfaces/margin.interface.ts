import {ProductInterface} from './product.interface';

export interface MarginInterface {
  margin: {
    price_total: number;
    distributor_margin_total: number;
    retailer_margin_total: number;
  };
  high_margin_product: ProductInterface;
  high_count_product: ProductInterface;
}
