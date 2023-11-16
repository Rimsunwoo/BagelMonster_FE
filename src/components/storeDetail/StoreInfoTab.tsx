"use client";

import { useState } from "react";

import StoreInfo from "./StoreInfo";
import StoreMenu from "./StoreMenu";

import type { Product } from "@/types/product.type";
import type { IStoreInfo } from "@/types/store.type";

interface StoreInfoTabProps {
  infoData: IStoreInfo;
  products: Product[];
  storeId?: number;
}

export default function StoreInfoTab({ infoData, products, storeId }: StoreInfoTabProps) {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div className="flex my-8 w-full ">
        <h3 onClick={() => setTab(0)} className={tab == 0 ? `info-focus-tab focus-tab` : `focus-tab`}>
          <span>전체메뉴</span>
        </h3>
        <h3 onClick={() => setTab(1)} className={tab == 1 ? `info-focus-tab focus-tab ` : `focus-tab`}>
          가게정보
        </h3>
        <div className="w-[80%] border-b-2 border-[#999999]"></div>
      </div>
      {tab === 0 ? <StoreMenu products={products} storeId={storeId} /> : <StoreInfo infoData={infoData} />}
    </>
  );
}
