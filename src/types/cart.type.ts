export interface CartPostApi {
  storeId: number;
  productId: number;
  quantity: number;
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
