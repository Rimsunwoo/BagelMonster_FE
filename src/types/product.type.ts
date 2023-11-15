export interface Product {
  storeName: string;
  productId: number;
  name: string;
  description: string;
  price: number;
  productPictureUrl: string;
  popularity: string;
  status: boolean;
  createdDate: string;
  modifiedDate: string;
}

export interface ProductApi {
  productId: string;
  storeId: string;
  quantity: number;
  token: string | undefined;
}
