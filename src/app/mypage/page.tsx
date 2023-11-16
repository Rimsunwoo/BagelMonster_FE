"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import OrderList from "@/components/mypage/OrderList";
import StoreForm from "@/components/mypage/StoreForm";
import useAuth from "@/hooks/useAuth";

export default function Mypage() {
  const router = useRouter();
  const { signout, isLogin, isStore } = useAuth();

  if (!isLogin()) {
    router.replace("/");
  }

  return (
    <div className="px-5">
      <input className="w-full mt-4 auth-button text-button bg-gray" type="button" value="로그아웃" onClick={signout} />
      {isStore() && <StoreForm />}
      {!isStore() && <OrderList />}
    </div>
  );
}
