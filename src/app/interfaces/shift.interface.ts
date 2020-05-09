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
  entries: ShiftProductsInterface;
}
