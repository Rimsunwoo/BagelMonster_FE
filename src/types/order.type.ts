import type { StoreOrderStatus } from "./cart.type";
import type { ProductGetResponse } from "./product.type";

export interface GetOrderRequest {
  storeId: number;
  orderId: number;
  token: string | undefined;
}

export interface GetOrderResponse {
  orderId: number;
  storeName: string;
  products: ProductGetResponse[];
  totalPrice: number;
  storeStatus: StoreOrderStatus;
  createdDate: string;
  modifiedDate: string;
}

export interface PatchOrderRequest {
  orderId: number;
  type: StoreOrderStatus;
  token: string | undefined;
}
