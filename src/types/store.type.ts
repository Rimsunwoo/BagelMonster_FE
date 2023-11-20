import type { Token } from "./auth.type";
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

interface StoreProps {
  name: string;
  address: string;
  phone: string;
  content: string;
  productCreatedTime: string;
  openedTime: string;
  closedTime: string;
}

export interface StoreFormProps extends StoreProps {
  closedDays: string[];
}

export interface StorePutApi extends StoreProps {
  storeId: number;
  closedDays: string;
}

export interface ModifyStoreRequest {
  store: StorePutApi;
  token: Token;
  file: File | undefined;
}

export interface StoreDeleteRequest {
  storeId: number;
  token: Token;
}
export interface StorePostRequest {
  createStoreRequest: Omit<IStore, "storeId" | "products" | "createdDate" | "modifiedDate" | "storePictureUrl">;
  imgFile: File;
  token: Token;
}
