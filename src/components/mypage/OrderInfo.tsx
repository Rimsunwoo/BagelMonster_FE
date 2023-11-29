import React from "react";

import { changeFormat } from "@/utils/changeFormat";

import type { GetCartResponse } from "@/types/cart.type";
import type { GetOrderResponse } from "@/types/order.type";

interface Props {
  orderInfo: GetOrderResponse | GetCartResponse;
}

export default function OrderInfo({ orderInfo }: Props) {
  const { modifiedDate, products, storeStatus, totalPrice } = orderInfo;

  return (
    <div className="flex justify-around w-full gap-[6px] mt-2 text-[#787878] text-sm font-normal leading-[150%]">
      <div className="flexcol">
        <div className="flex gap-3 w-60">
          <span className="font-semibold">주문 번호</span>
          {"orderId" in orderInfo && <p>{orderInfo.orderId}</p>}
          {"cartId" in orderInfo && <p>{orderInfo.cartId}</p>}
        </div>
        <div className="flex gap-3 w-60">
          <span className="font-semibold">주문 일자</span>
          <p>{changeFormat.time(modifiedDate)}</p>
        </div>
        <div className="flex gap-3 w-60 text-[#787878] text-sm font-normal leading-[150%]">
          <span className="font-semibold">주문 상품</span>
          <p>{changeFormat.outer(products)}</p>
        </div>
      </div>
      <div className="flexcol">
        <div className="flex gap-3 w-60">
          <span className="font-semibold">주문 상태</span>
          <p>{changeFormat.orderStatus(storeStatus)}</p>
        </div>
        <div className="flex gap-3 w-60">
          <span className="font-semibold">주문 가격</span>
          <p>{changeFormat.price(totalPrice)}원</p>
        </div>
      </div>
    </div>
  );
}
