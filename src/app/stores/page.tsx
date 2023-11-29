"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import StoreCard from "@/components/storeList/StoreCard";
import StoreHeader from "@/components/storeList/StoreHeader";
import useDistanceGap from "@/hooks/useDistanceGap";
import isStoreOpen from "@/utils/isStoreOpen";

import { getStore } from "../api/store";

export type Filter = "all" | "new" | "distance";

export default function Stores() {
  const [filter, setFilter] = useState<Filter>("all");
  const [showIsOpenStore, setShowIsOpenStore] = useState<boolean>(false);
  const { distanceGap, getDistanceGap } = useDistanceGap();
  const { data: storeData } = useQuery({ queryKey: ["stores"], queryFn: getStore, initialData: [] });

  useEffect(() => {
    storeData.forEach((store) => {
      getDistanceGap(store.storeId, store.address);
    });
  }, [storeData]);

  const filterData = () => {
    const currentOpenStore = storeData.filter((store) =>
      showIsOpenStore ? isStoreOpen(store.openedTime, store.closedTime, store.closedDays) : store,
    );

    switch (filter) {
      case "distance":
        return currentOpenStore.sort((a, b) => (distanceGap[b.storeId] < distanceGap[a.storeId] ? 1 : -1));
      case "new":
        return currentOpenStore.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
      default:
        return currentOpenStore;
    }
  };

  const changeFilterStatus = (filter: Filter) => {
    setFilter(filter);
  };

  const currentIsOpenStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowIsOpenStore(e.target.checked);
  };

  return (
    <div className="flexcol gap-5">
      <StoreHeader
        filter={filter}
        showIsOpenStore={showIsOpenStore}
        changeFilterStatus={changeFilterStatus}
        currentIsOpenStore={currentIsOpenStore}
      />
      <ul className="bg-[#fff3f0] w-full h-full flexcol px-5 py-8 gap-4 select-none">
        {filterData().map((store) => (
          <StoreCard key={store.storeId} store={store} distanceGap={distanceGap} />
        ))}
      </ul>
    </div>
  );
}
