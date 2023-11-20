import { getMyStore } from "./store";

import type { Token } from "@/types/auth.type";
import type { GetCartResponse } from "@/types/cart.type";
import type { GetOrderResponse, PatchOrderRequest } from "@/types/order.type";

import { API_URL } from ".";

export async function getMyOrderList(token: Token) {
  if (!token) throw new Error("로그인이 필요합니다.");

  const response = await fetch(`${API_URL}/api/carts/history`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }

  return data.carts as GetCartResponse[];
}

export async function getAllOrderToStore(token: Token) {
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

    return data.orders as GetOrderResponse[];
  });
}

export async function changeOrderStatus({ orderId, type, token }: PatchOrderRequest) {
  if (!token) throw new Error("로그인이 필요합니다.");

  const status = () => {
    if (type === "READ") return "read";
    else if (type === "CANCELED") return "canceled";
    else return "sold";
  };

  await getMyStore(token).then(async (myStore) => {
    if (!myStore) return;
    const response = await fetch(`${API_URL}/api/stores/${myStore.storeId}/orders/${orderId}/${status()}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.statusMessage);
    }
  });
}
