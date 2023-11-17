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

  if (isPending) return <h1>로딩중</h1>;
  if (isError || storeDetailData === undefined) return <h1>해당 가게를 찾을 수 없습니다</h1>;

  const { openedTime, closedTime, closedDays, products } = storeDetailData;

  return (
    <>
      <StoreIntro isOpen={isStoreOpen(openedTime, closedTime, closedDays)} />
      <StoreInfoTab products={products} />
    </>
  );
}
