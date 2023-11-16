"use client";

import { useQuery } from "@tanstack/react-query";

import { getStoreDetail } from "@/app/api/store";
import StoreInfoTab from "@/components/storeDetail/StoreInfoTab";
import StoreIntro from "@/components/storeDetail/StoreIntro";
import isStoreOpen from "@/utils/isStoreOpen";
interface StoreDetailProps {
  params: {
    storeId: string;
  };
}
//#TODO 오픈시간 계산 함수, NEW 아이콘 범위지정 후 함수 생성
export default function StoreDetail({ params: { storeId } }: StoreDetailProps) {
  const {
    isPending,
    isError,
    data: storeDetailData,
  } = useQuery({ queryKey: ["storeDetail"], queryFn: () => getStoreDetail(storeId) });

  const {
    name,
    address,
    phone,
    content,
    productCreatedTime,
    openedTime,
    closedTime,
    closedDays,
    createdDate,
    modifiedDate,
    products,
    storePictureUrl,
  } = storeDetailData || {};
  const infoData = { name, address, phone, openedTime, closedTime, closedDays };
  let isOpen;
  if (storeDetailData) {
    isOpen = isStoreOpen(openedTime, closedTime, closedDays);
  }
  if (isPending) {
    return <h1>로딩중</h1>;
  }
  if (isError) {
    return <h1>해당 가게를 찾을 수 없습니다</h1>;
  }
  if (storeDetailData)
    return (
      <>
        <StoreIntro name={name} content={content} isOpen={isOpen} storePictureUrl={storePictureUrl} />
        <StoreInfoTab infoData={infoData} products={products} />
      </>
    );
}
