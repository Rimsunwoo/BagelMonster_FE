import type { ProductApi } from "@/types/product.type";

import { API_URL } from ".";

export async function getProduct(storeId: string, productId: string) {
  const response = await fetch(`${API_URL}/api/stores/${storeId}/products/${productId}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("StoreDetail GET failed");
  }
  const data = await response.json();
  return data;
}

export async function addCart(request: ProductApi) {
  const { storeId, productId, quantity, token } = request;
  const Authorization = token;
  const reqBody = { storeId, productId, quantity };
  const response = await fetch(`${API_URL}/api/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization },
    body: JSON.stringify(reqBody),
  });

  if (!response.ok) {
    let error = await response.json();
    // let errArr = error.statusMessage;
    alert(error.statusMessage);
    throw new Error("error");
  }

  alert("장바구니 담기 성공");
}
