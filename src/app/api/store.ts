import type { IStore, StorePostApi } from "@/types/store.type";

import { API_URL } from "./index";

export async function getStore() {
  const Authorization = document.cookie.replace("auth=", "");

  const response = await fetch(`${API_URL}/api/stores`, {
    method: "GET",
    headers: { Authorization },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Store GET failed");
  }

  return data.stores as IStore[];
}

export async function createStore(store: StorePostApi, file: File) {
  const formData = new FormData();
  const Authorization = document.cookie.replace("auth=", "");

  formData.append("requestDto", new Blob([JSON.stringify(store)], { type: "application/json" }));
  formData.append("picture", file);

  const response = await fetch(`${API_URL}/api/stores`, {
    method: "POST",
    headers: { Authorization },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Store POST failed");
  }
}