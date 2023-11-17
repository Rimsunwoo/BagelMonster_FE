import type { OrderGetApi } from "@/types/cart.type";
import type { IStore, StorePostApi, StorePutApi } from "@/types/store.type";

import { API_URL } from "./index";

export async function getStore() {
  const response = await fetch(`${API_URL}/api/stores`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }

  return data.stores as IStore[];
}

export async function getStoreDetail(storeId: string) {
  const response = await fetch(`${API_URL}/api/stores/${storeId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }

  return data;
}

export async function getMyStore(token: string | undefined) {
  if (token === undefined) throw new Error("토큰이 없습니다.");

  const response = await fetch(`${API_URL}/api/stores/mystore`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) return null;
    alert(data.statusMessage);
  }

  return data as IStore;
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

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }
}

export async function getAllOrder(token: string | undefined) {
  if (token === undefined) throw new Error("토큰이 없습니다.");

  return await getMyStore(token).then(async (myStore) => {
    if (!myStore) return;
    const response = await fetch(`${API_URL}/api/stores/${myStore.storeId}/orders`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.statusMessage);
    }

    return data.orders as OrderGetApi[];
  });
}

interface ModifyStoreRequest {
  store: StorePutApi;
  token: string | undefined;
  file: File | undefined;
}

export async function modifyStore({ store, token, file }: ModifyStoreRequest) {
  if (token === undefined) throw alert("토큰이 없습니다.");
  const formData = new FormData();

  formData.append("requestDto", new Blob([JSON.stringify(store)], { type: "application/json" }));
  if (file) {
    formData.append("picture", file);
  }

  const response = await fetch(`${API_URL}/api/stores/${store.storeId}`, {
    method: "PUT",
    headers: { Authorization: token },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }
}

export async function deleteStore(storeId: number, token: string | undefined) {
  if (token === undefined) throw new Error("토큰이 없습니다.");

  const response = await fetch(`${API_URL}/api/stores/${storeId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }
}
