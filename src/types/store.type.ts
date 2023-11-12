import type { Product } from "./product.type";

export interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  openedTime: string;
  closedTime: string;
  closedDays: string;
}

export interface Store extends StoreInfo {
  content: string;
  productCreatedTime: string;
  createdDate: string;
  modifiedDate: string;
  products: Product[];
}
