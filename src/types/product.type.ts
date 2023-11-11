export interface Product {
  productId: string;
  name: string;
  storeName: string;
  description: string;
  price: number;
  productPictureUrl: string;
  popularity: string;
  status: boolean;
}

export interface ProductApi {
  productId: string;
  storeId: string;
  quantity: number;
}
