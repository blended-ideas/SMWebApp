export interface ShiftProductsInterface {
  id: string;
  product: string;
  shift: string;
  quantity: number;
}

export interface ShiftDetailInterface {
  id: string;
  start_dt: string;
  end_dt: string;
  user: string;
  user_name: string;
  entries: ShiftProductsInterface;

  price_total: number;
  distributor_margin_total: number;
  retailer_margin_total: number;
}
