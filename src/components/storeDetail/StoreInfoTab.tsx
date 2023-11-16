"use client";

import { useState } from "react";

import { useRouter } from "next/router";

import StoreCaution from "./StoreCaution";
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
  const router = useRouter();

  const onClickAddMenu = () => {
    router.push("/mystore/addmenu");
  };

  return (
    <>
      <div className="flex my-8 w-full ">
        <button onClick={() => setTab(0)} className={tab == 0 ? `info-focus-tab focus-tab` : `focus-tab`}>
          전체메뉴
        </button>
        <button onClick={() => setTab(1)} className={tab == 1 ? `info-focus-tab focus-tab ` : `focus-tab`}>
          가게정보
        </button>
        <div className="w-[70%] border-b-2 border-[#999999]">
          {storeId && (
            <button onClick={onClickAddMenu} className="text-sm w-[20%] h-[39px] font-bold text-center pb-3">
              메뉴추가
            </button>
          )}
        </div>
      </div>
      {tab === 0 ? (
        <>
          <StoreMenu products={products} storeId={storeId} />
          <StoreCaution />
        </>
      ) : (
        <StoreInfo infoData={infoData} />
      )}
    </>
  );
}
