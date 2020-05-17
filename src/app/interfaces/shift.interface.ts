export interface ShiftEntryInterface {
  shift: string;
  product: string;
  product_name: string;

  quantity: number;
  price: number;
  distributor_margin: number;
  retailer_margin: number;

  entry_total: number; // Calculated Field
}

export interface ShiftDetailInterface {
  id: string;
  start_dt: string;
  end_dt: string;
  user: number;
  user_name: string;
  entries: ShiftEntryInterface[];

  approved: boolean;
  approved_by: number;
  approved_by_name: string;

  price_total: number;
  distributor_margin_total: number;
  retailer_margin_total: number;
}
