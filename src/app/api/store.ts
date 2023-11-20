import type { Token } from "@/types/auth.type";
import type { IStore, ModifyStoreRequest, StoreDeleteRequest, StorePostRequest } from "@/types/store.type";

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

export async function getMyStore(token: Token) {
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

export async function createStore({ createStoreRequest, imgFile, token }: StorePostRequest) {
  if (token === undefined) throw new Error("토큰이 없습니다.");
  const formData = new FormData();

  formData.append("requestDto", new Blob([JSON.stringify(createStoreRequest)], { type: "application/json" }));
  formData.append("picture", imgFile);

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

export async function deleteStore({ storeId, token }: StoreDeleteRequest) {
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
