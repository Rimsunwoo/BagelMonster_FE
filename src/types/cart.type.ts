import type { Product } from "./product.type";

export interface CartPostRequest {
  storeId: number;
  productId: number;
  quantity: number;
}

type StoreStatus = "NEWORDER" | "READ" | "SOLE" | "CANCELED";

export type ProductGetResponse = Pick<Product, "productId" | "name" | "productPictureUrl" | "price"> & {
  quantity: number;
};

export interface CartGetResponse {
  cartId: number;
  storeName: string;
  products: ProductGetResponse[];
  totalPrice: number;
  storeStatus: StoreStatus;
  createdDate: string;
  modifiedDate: string;
}

export interface CartGetApi {
  cartId: number;
  storeName: string;
  products: CartProduct[];
  totalPrice: number;
  request: string;
  createdDate: string;
  modifiedDate: string;
}

interface CartProduct {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  productPictureUrl: string;
}
