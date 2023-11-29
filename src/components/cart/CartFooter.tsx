import React from "react";

import useCart from "@/hooks/useCart";
import { changeFormat } from "@/utils/changeFormat";

import type { BuyProductRequest } from "@/app/cart/page";

interface Props {
  total: Omit<BuyProductRequest, "productId">;
  productsToBuy: BuyProductRequest[];
}

export default function CartFooter({ total, productsToBuy }: Props) {
  const { buyHandler } = useCart();
  return (
    <div className="w-full flex-col justify-start items-center flex gap-6 px-[5%]">
      <div className="flexcol w-full">
        <p className="self-stretch justify-between items-start inline-flex text-sm font-medium leading-[150%]">
          <span className="text-gray">주문 상품 수</span>
          <span className="text-black">총 {total.quantity}개</span>
        </p>
        <p className="self-stretch justify-between items-center inline-flex text-lg leading-[150%]">
          <span className="text-black font-bold">총 결제금액</span>
          <span className="text-[#f15a23] font-semibold">{changeFormat.price(total.price)}원</span>
        </p>
      </div>
      <input
        className="w-full px-4 py-3 rounded bg-[#f15a23] text-[#fff] text-lg font-semibold leading-[125%] cursor-pointer"
        onClick={() => buyHandler({ productsToBuy, totalPrice: total.price })}
        value="구매하기"
        type="button"
      />
    </div>
  );
}
