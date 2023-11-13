"use client";

import { Fragment } from "react";

import { TEST_API_GET } from "./testDb";
import Counter from "../common/Counter";

export default function ProductList() {
  return (
    <div className="w-full flex-col gap-6 flex px-[5%]">
      {TEST_API_GET.map((product, index) => (
        <Fragment key={product.id}>
          {index !== 0 && <div className="w-full bg-[#ebebeb] h-px" />}
          <div className="w-full px-3 bg-white flex gap-3">
            <input className="checkbox" type="checkbox" />
            <div className="gap-5 inline-flex items-center">
              <div className="w-24 h-24 bg-red-500 bg-opacity-20 rounded">이미지</div>
              <div className="flex-col gap-3 inline-flex">
                <div className="flex-col gap-2 flex">
                  <p className=" text-zinc-800 text-base font-bold leading-snug">{product.name}</p>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <p className="text-[#f15a23] text-sm font-bold leading-tight">
                      {String(product.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Counter productId={product.id} />
                  <button className="border border-[#ddd] rounded-sm px-2 py-1 h-6 text-black text-[13px] font-medium leading-[125%]">
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
