import type { Token } from "@/types/auth.type";
import type { DeleteCartRequest, GetCartResponse, PatchCartRequest, PostCartRequest } from "@/types/cart.type";

import { API_URL } from ".";

export async function getCart(token: Token) {
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

  return data as GetCartResponse;
}

export async function PostCart(request: PostCartRequest) {
  const { storeId, productId, quantity, token } = request;
  if (!token) throw new Error("로그인이 필요합니다.");

  const reqBody = { storeId, productId, quantity };
  const response = await fetch(`${API_URL}/api/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(reqBody),
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }
}

export async function PatchCartToBuy({ cartId, productList, totalPrice, token }: PatchCartRequest) {
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

export async function deleteCart({ cartId, productId, token }: DeleteCartRequest) {
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
