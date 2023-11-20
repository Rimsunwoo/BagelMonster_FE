"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { getMyOrderList } from "@/app/api/carts";
import KakaoMap from "@/components/common/KakaoMap";
import OrderTotalPrice from "@/components/receipt/OrderTotalPrice";
import ReceiptButtons from "@/components/receipt/ReceiptButtons";
import ReceiptTextBox from "@/components/receipt/ReceiptTextBox";
import useAuth from "@/hooks/useAuth";
import { changeFormat } from "@/utils/changeFormat";

import type { StoreStatus } from "@/types/cart.type";

export default function Receipt() {
  const cartId = usePathname().replace("/receipt/", "");
  const { getCookie } = useAuth();

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getMyOrderList(getCookie()),
  });

  const myOrder = data?.find((order) => order.cartId === Number(cartId));
  if (!myOrder) return <p>찾을 수 없는 주문 내역입니다.</p>;

  const orderStatusHandler = (orderStatus: StoreStatus) => {
    if (orderStatus === "NEWORDER") return "주문 접수 중";
    if (orderStatus === "READ") return "주문 접수 완료";
    if (orderStatus === "CANCELED") return "주문 취소";
    return "판매 완료";
  };

  return (
    <div className="w-full tracking-tight leading-tight px-[12px]">
      <h2 className="mt-[68px] text-[32px] tracking-tight leading-tight font-normal text-black">
        <b>주문</b>이 <br />
        <b>완료</b>되었습니다 :)
      </h2>
      <div className="flexcol gap-[14px] mt-[40px] py-[24px] border-y-[1px] border-[#C5C5C5]">
        <ReceiptTextBox title="주문 상태" content={orderStatusHandler(myOrder.storeStatus)} />
        <ReceiptTextBox title="주문 시간" content={myOrder?.modifiedDate.replace("T", " ").slice(0, 16)} />
        <ReceiptTextBox title="주문 번호" content={myOrder.cartId} />
        <ReceiptTextBox title="주문 상품명" content={changeFormat.outer(myOrder.products)} />
      </div>
      <div className="flexcol gap-[14px] py-[24px] border-b-[1px] border-[#C5C5C5]">
        <ReceiptTextBox title="가게명" content={myOrder.storeName} />
        <ReceiptTextBox title="전화번호" content={myOrder.phone} />
        <ReceiptTextBox title="주소" content={myOrder.address} />
        <KakaoMap address={myOrder.address} />
      </div>
      <div className="flexcol gap-[24px] mt-[62px]">
        <OrderTotalPrice totalPrice={changeFormat.price(myOrder.totalPrice)} />
        <ReceiptButtons />
      </div>
    </div>
  );
}
