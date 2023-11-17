"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import Link from "next/link";

import ModifyStoreForm from "./ModifyStoreForm";
import StoreCaution from "./StoreCaution";
import StoreInfo from "./StoreInfo";
import StoreMenu from "./StoreMenu";

import type { RootState } from "@/redux/config/configStore";
import type { Product } from "@/types/product.type";

interface StoreInfoTabProps {
  products: Product[];
  storeId?: number;
}

export default function StoreInfoTab({ products, storeId }: StoreInfoTabProps) {
  const { editState } = useSelector((state: RootState) => state.editStore);
  const [tab, setTab] = useState(0);

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
            <Link
              href={`/mystore/${storeId}/addmenu`}
              className="inline-flex items-center justify-center text-sm w-[20%] h-[39px] font-bold text-center pb-3"
            >
              메뉴추가
            </Link>
          )}
        </div>
      </div>
      {tab === 0 && (
        <>
          <StoreMenu products={products} storeId={storeId} />
          <StoreCaution />
        </>
      )}
      {tab === 1 && (editState ? <ModifyStoreForm /> : <StoreInfo />)}
    </>
  );
}
