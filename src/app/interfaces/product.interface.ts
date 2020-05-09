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
