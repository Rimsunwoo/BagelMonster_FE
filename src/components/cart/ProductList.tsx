"use client";

import { Fragment } from "react";

import { PRICE_REG_EXR } from "@/app/cart/page";

import { productList } from "./testDb";

export default function ProductList() {
  return (
    <div className="w-full flex-col gap-6 flex px-[5%]">
      {productList.map((product, index) => (
        <Fragment key={product.id}>
          {index !== 0 && <div className="w-full bg-[#ebebeb] h-px" />}
          <div className="w-full px-3 bg-white flex gap-3">
            <input className="checkbox" type="checkbox" />
            <div className="gap-5 inline-flex items-center">
              <img className="w-24 h-24 bg-red-500 bg-opacity-20 rounded" />
              <div className="flex-col gap-3 inline-flex">
                <div className="flex-col gap-2 flex">
                  <p className=" text-zinc-800 text-base font-bold leading-snug">{product.name}</p>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <p className="text-[#f15a23] text-sm font-bold leading-tight">
                      {product.price.toString().replace(PRICE_REG_EXR, ",")}원
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button>count button</button>
                  <button className="border border-[#ddd] rounded-sm px-2 py-1 h-6 text-[#333] text-[13px] font-medium leading-[125%]">
                    선택 삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
