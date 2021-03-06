export interface ProductInterface {
  id: string;
  created_by: number;

  name: string;
  category: string;

  stock: number;
  price: number;
  landing_price: number;
  distributor_margin: number;
  retailer_margin: number;
  barcode_entry: string;

  image: string;
  is_active: boolean;

  high_margin?: number; // For Margins
  high_count?: number; // For Margins
}

export interface ProductStockChangeInterface {
  id: number;
  created: string;

  user: string;
  user_name: string;

  product: string;
  value: number;
  changeType: 'INITIAL_STOCK' | 'SHIFT' | 'ADDITION' | 'DEDUCTION';

  shift_total?: number; // Calculated
}


export interface ProductExpiryDateInterface {
  id: number;
  user: number;
  user_name: string;

  product: string;
  product_name: string;

  datetime: string;
}
