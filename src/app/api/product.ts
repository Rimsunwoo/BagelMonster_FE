import type { Product, ProductApi } from "@/types/product.type";

import { API_URL } from ".";

export async function getProduct(storeId: string, productId: string) {
  const response = await fetch(`${API_URL}/api/stores/${storeId}/products/${productId}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("StoreDetail GET failed");
  }
  const data: Product = await response.json();
  return data;
}

export async function addCart(request: ProductApi) {
  const response = await fetch(`${API_URL}/api/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("장바구니 담기 실패");
  }

  alert("장바구니 담기 성공");
}
