"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import OrderList from "@/components/mypage/OrderList";
import StoreForm from "@/components/mypage/StoreForm";
import useAuth from "@/hooks/useAuth";

export default function Mypage() {
  const router = useRouter();
  const [isOpenStoreForm, setIsOpenStoreForm] = useState(false);
  const { signout, isLogin, isStore } = useAuth();

  if (!isLogin()) {
    router.replace("/");
  }

  return (
    <div>
      <div className="flex justify-around">
        <input className="p-4 border cursor-pointer" type="button" value="로그아웃" onClick={signout} />
        {isStore() && (
          <input
            className="p-4 border cursor-pointer"
            type="button"
            value="가게 등록"
            onClick={() => setIsOpenStoreForm(!isOpenStoreForm)}
          />
        )}
      </div>
      {isOpenStoreForm && <StoreForm />}
      {!isStore() && <OrderList />}
    </div>
  );
}
