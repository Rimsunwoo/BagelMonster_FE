"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import StoreForm from "@/components/mypage/StoreForm";
import StoreInfoTab from "@/components/storeDetail/StoreInfoTab";
import StoreIntro from "@/components/storeDetail/StoreIntro";
import useAuth from "@/hooks/useAuth";
import { setStore } from "@/redux/modules/editStoreSlice";
import isStoreOpen from "@/utils/isStoreOpen";

import { getMyStore } from "../api/store";

export default function MyStore() {
  const { getUserInfo, getCookie } = useAuth();
  const userInfo = getUserInfo();
  const dispatch = useDispatch();

  const { data, isError } = useQuery({
    queryKey: ["mystore", userInfo?.name],
    queryFn: () => getMyStore(getCookie()),
  });

  useEffect(() => {
    dispatch(setStore(data));
  }, [data, dispatch]);

  if (data === null) return <StoreForm />;

  if (data === undefined || isError) return <div>등록된 가게가 없거나 로그인 정보가 올바르지 않습니다.</div>;

  const { products, openedTime, closedTime, closedDays } = data;

  return (
    <>
      <StoreIntro isOpen={isStoreOpen(openedTime, closedTime, closedDays)} />
      <StoreInfoTab products={products} storeId={data.storeId} />
    </>
  );
}
