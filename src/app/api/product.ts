import type { ProductApi } from "@/types/product.type";

import { API_URL } from ".";

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
