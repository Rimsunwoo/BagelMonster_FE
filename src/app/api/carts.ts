import type { CartGetResponse } from "@/types/cart.type";

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
    throw new Error("장바구니 담기 실패");
  }

  return data as CartGetResponse;
}

export async function getMyOrder({ storeId, orderId, token }: GetOrderRequest) {
  if (!token) throw new Error("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/stores/${storeId}/orders/${orderId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  if (!response.ok) {
    throw new Error("주문 불러오기 실패");
  }

  const data = await response.json();
  return data as CartGetResponse;
}

export async function getMyOrderList(token: string | undefined) {
  if (!token) throw new Error("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/carts/history`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  if (!response.ok) {
    throw new Error("주문 불러오기 실패");
  }

  const data = await response.json();
  return data.carts as CartGetResponse[];
}

export async function postOrder({ cartId, productList, totalPrice, token }: OrderPostRequest) {
  if (token === undefined) throw new Error("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/carts/${cartId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ productList, totalPrice }),
  });

  if (!response.ok) {
    throw new Error("구매 실패");
  }
}

export async function deleteCart({ cartId, productId, token }: CartDeleteRequest) {
  if (token === undefined) throw new Error("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/carts/${cartId}/products/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  if (!response.ok) {
    throw new Error("장바구니 삭제 실패");
  }
}
