import { getMyStore } from "./store";

import type { CartGetResponse, StoreStatus } from "@/types/cart.type";

import { API_URL } from ".";

interface GetOrderRequest {
  storeId: number;
  orderId: number;
  token: string | undefined;
}

interface OrderPostRequest {
  cartId: number;
  productList: { productId: number; quantity: number }[];
  totalPrice: number;
  token: string | undefined;
}

interface OrderStatusRequest {
  orderId: number;
  type: StoreStatus;
  token: string | undefined;
}

export interface CartDeleteRequest {
  cartId: number;
  productId: number;
  token: string | undefined;
}

export async function getCart(token: string | undefined) {
  if (token === undefined) throw new Error("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/carts`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.statusCode === 404) return null;
    alert(data.statusMessage);
  }

  return data as CartGetResponse;
}

export async function getMyOrder({ storeId, orderId, token }: GetOrderRequest) {
  if (!token) throw alert("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/stores/${storeId}/orders/${orderId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }

  return data as CartGetResponse;
}

export async function getMyOrderList(token: string | undefined) {
  if (!token) throw new Error("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/carts/history`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }

  return data.carts as CartGetResponse[];
}

export async function postOrder({ cartId, productList, totalPrice, token }: OrderPostRequest) {
  if (token === undefined) throw new Error("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/carts/${cartId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ productList, totalPrice }),
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }
}

export async function deleteCart({ cartId, productId, token }: CartDeleteRequest) {
  if (token === undefined) throw new Error("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/carts/${cartId}/products/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }
}

export async function onChangeOrderStatus({ orderId, type, token }: OrderStatusRequest) {
  if (!token) throw new Error("로그인이 필요합니다.");

  const status = () => {
    if (type === "READ") return "read";
    else if (type === "CANCELED") return "canceled";
    else return "sold";
  };

  await getMyStore(token).then(async (myStore) => {
    if (!myStore) return;
    const response = await fetch(`${API_URL}/api/stores/${myStore.storeId}/orders/${orderId}/${status()}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.statusMessage);
    }
  });
}
