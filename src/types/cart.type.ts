import type { ProductGetResponse } from "./product.type";

export type StoreOrderStatus = "NEWORDER" | "READ" | "SOLD" | "CANCELED";

export interface GetCartResponse {
  cartId: number;
  storeId: number;
  storeName: string;
  address: string;
  phone: string;
  products: ProductGetResponse[];
  totalPrice: number;
  storeStatus: StoreOrderStatus;
  createdDate: string;
  modifiedDate: string;
}

export interface PostCartRequest {
  productId: string;
  storeId: string;
  quantity: number;
  token: string | undefined;
}

export interface PatchCartRequest {
  cartId: number;
  productList: { productId: number; quantity: number }[];
  totalPrice: number;
  token: string | undefined;
}

export interface DeleteCartRequest {
  cartId: number;
  productId: number;
  token: string | undefined;
}
