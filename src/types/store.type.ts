import type { HTMLInputTypeAttribute } from "react";

import type { Product } from "./product.type";

export interface IStore {
  storeId: number;
  name: string;
  address: string;
  storePictureUrl: string;
  phone: string;
  content: string;
  productCreatedTime: string;
  openedTime: string;
  closedTime: string;
  closedDays: string;
  createdDate: string;
  modifiedDate: string;
  products: Product[];
}

export interface CreateStore {
  storeName: string;
  address: string;
  storePhone: string;
  content: string;
  productCreatedTime: string;
  openedTime: string;
  closedTime: string;
  closedDays: string[];
}

export interface InputProps<FormType> {
  id: keyof FormType;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

export type StorePostApi = Omit<IStore, "storeId" | "products" | "createdDate" | "modifiedDate" | "storePictureUrl">;

export interface IStoreInfo {
  name: string;
  address: string;
  phone: string;
  openedTime: string;
  closedTime: string;
  closedDays: string;
}

export interface Store extends IStoreInfo {
  content: string;
  productCreatedTime: string;
  createdDate: string;
  modifiedDate: string;
  products: Product[];
}
