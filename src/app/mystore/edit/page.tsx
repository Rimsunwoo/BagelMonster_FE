"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const { signout } = useAuth();
  const router = useRouter();
  const onClickSignout = () => {
    signout();
    router.push("/signin");
  };

  return (
    <div>
      <button onClick={onClickSignout}>로그아웃</button>
    </div>
  );
}
