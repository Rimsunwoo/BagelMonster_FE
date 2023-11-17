"use client";

import { useRouter } from "next/navigation";

import OrderList from "@/components/mypage/OrderList";
import StoreOrderList from "@/components/mypage/StoreOrderList";
import useAuth from "@/hooks/useAuth";

import { deleteStore, getMyStore } from "../api/store";

export default function Mypage() {
  const router = useRouter();
  const { signout, isLogin, isStore, getCookie } = useAuth();

  if (!isLogin()) {
    router.replace("/");
  }

  const onClickDeleteStore = async () => {
    if (!isStore()) return;
    const myStore = await getMyStore(getCookie());

    if (!myStore) return;
    deleteStore(myStore.storeId, getCookie());
  };

  return (
    <div className="px-5">
      <input className="w-full mt-4 auth-button text-button bg-gray" type="button" value="로그아웃" onClick={signout} />
      {isStore() && (
        <>
          <input
            className="w-full mt-4 auth-button text-button bg-orange"
            type="button"
            value="가게 삭제"
            onClick={onClickDeleteStore}
          />
          <StoreOrderList type={"done"} />
        </>
      )}
      {!isStore() && <OrderList />}
    </div>
  );
}
