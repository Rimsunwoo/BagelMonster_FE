import type { AddOrModifyProductApi, Product, ProductApi } from "@/types/product.type";

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
  const { storeId, productId, quantity, token } = request;
  if (token === undefined) return;

  const Authorization = token;
  const reqBody = { storeId, productId, quantity };
  const response = await fetch(`${API_URL}/api/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization },
    body: JSON.stringify(reqBody),
  });

  if (!response.ok) {
    let error = await response.json();
    throw error.statusMessage;
  } else {
    alert("장바구니 담기 성공");
  }
}

export async function addProduct(req: AddOrModifyProductApi, storeId: string, token: string | undefined) {
  if (token === undefined) return;

  const reqUrl = `${API_URL}/api/stores/${storeId}/products`;
  const Authorization = token;
  const formData = new FormData();

  if (req.picture !== null) formData.append("picture", req.picture);
  formData.append("requestDto", new Blob([JSON.stringify(req.requestDto)], { type: "application/json" }));

  const response = await fetch(reqUrl, {
    method: "POST",
    headers: { Authorization },
    body: formData,
  });

  console.log(response);
}

export async function modifyProduct(
  req: AddOrModifyProductApi,
  storeId: string,
  productId: string,
  token: string | undefined,
) {
  if (token === undefined) return;
  const reqUrl = `${API_URL}/api/stores/${storeId}/products/${productId}`;
  const Authorization = token;
  const formData = new FormData();

  if (req.picture !== null) formData.append("picture", req.picture);
  formData.append("requestDto", new Blob([JSON.stringify(req.requestDto)], { type: "application/json" }));

  const response = await fetch(reqUrl, {
    method: "PUT",
    headers: { Authorization },
    body: formData,
  });

  console.log(response);
}
