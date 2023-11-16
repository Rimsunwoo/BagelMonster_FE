"use client";

import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import React from "react";
import { getMyStore } from "../api/store";
import StoreIntro from "@/components/storeDetail/StoreIntro";
import StoreInfoTab from "@/components/storeDetail/StoreInfoTab";
import StoreCaution from "@/components/storeDetail/StoreCaution";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import StoreForm from "@/components/mypage/StoreForm";

export default function page() {
  const { getUserInfo } = useAuth();
  const cookies = useCookies();
  const router = useRouter();
  const token = cookies.get("token");
  const userInfo = getUserInfo();

  const { data, isError } = useQuery({
    queryKey: ["mystore", userInfo?.name],
    queryFn: () => getMyStore(token),
  });

  if (data === null) {
    return <StoreForm />;
  }
  if (data === undefined) return <div>토큰이 없음</div>;
  if (isError) return <div>가게가 없거나 </div>;

  const {
    name,
    address,
    phone,
    content,
    productCreatedTime,
    openedTime,
    storePictureUrl,
    closedTime,
    closedDays,
    createdDate,
    modifiedDate,
    products,
  } = data;
  const infoData = { name, address, phone, openedTime, closedTime, closedDays };

  console.log(data);
  return (
    <>
      <StoreIntro name={name} content={content} isOpen={true} storePictureUrl={storePictureUrl} />
      <StoreInfoTab infoData={infoData} products={products} storeId={data.storeId} />
      <StoreCaution />
    </>
  );
}
