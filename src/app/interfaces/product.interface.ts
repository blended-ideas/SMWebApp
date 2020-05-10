export interface ProductInterface {
  id: string;
  created_by: number;

  name: string;
  category: string;

  stock: number;
  price: number;
  distributor_margin: number;
  retailer_margin: number;
  barcode_entry: string;

  image: string;
  is_active: boolean;
}

export interface ProductMinimalInterface {
  name: string;
  category: string;
  price: number;
  distributor_margin: number;
  retailer_margin: number;
}

export interface ProductStockChangeInterface {
  id: number;
  user: string;
  product: string;
  product_minimal: ProductMinimalInterface;
  value: number;
  changeType: 'INITIAL_STOCK' | 'SHIFT' | 'ADDITION' | 'DEDUCTION';

  shift_total?: number; // Calculated
}
