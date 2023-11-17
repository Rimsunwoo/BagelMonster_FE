import type { OrderGetApi } from "@/types/cart.type";
import type { IStore, StorePostApi } from "@/types/store.type";

import { API_URL } from "./index";

export async function getStore() {
  const response = await fetch(`${API_URL}/api/stores`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Store GET failed");
  }

  return data.stores as IStore[];
}

export async function createStore(store: StorePostApi, file: File, token: string | undefined) {
  if (token === undefined) throw new Error("토큰이 없습니다.");
  const formData = new FormData();

  formData.append("requestDto", new Blob([JSON.stringify(store)], { type: "application/json" }));
  formData.append("picture", file);

  const response = await fetch(`${API_URL}/api/stores`, {
    method: "POST",
    headers: { Authorization: token },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Store POST failed");
  }
}

export async function getStoreDetail(storeId: string) {
  const response = await fetch(`${API_URL}/api/stores/${storeId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("StoreDetail GET failed");
  }

  return data;
}

export async function getMyStore(token: string | undefined) {
  if (token === undefined) return;

  const response = await fetch(`${API_URL}/api/stores/mystore`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  if (response.status === 404) {
    return null;
  }

  if (response.ok) {
    const data = await response.json();
    return data as IStore;
  }
}

export async function getAllOrder(token: string | undefined) {
  if (token === undefined) return;

  return await getMyStore(token).then(async (myStore) => {
    if (!myStore) return;
    const response = await fetch(`${API_URL}/api/stores/${myStore.storeId}/orders`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });

    if (!response.ok) {
      throw new Error("주문내역을 불러오는데 실패하였습니다.");
    }

    const data = await response.json();

    return data.orders as OrderGetApi[];
  });
}

export async function deleteStore(storeId: number, token: string | undefined) {
  if (token === undefined) throw new Error("토큰이 없습니다.");

  const response = await fetch(`${API_URL}/api/stores/${storeId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error("가게 삭제하는데 실패하였습니다.");
  }
}
