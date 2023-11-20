import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getMyOrderList } from "@/app/api/order";
import useAuth from "@/hooks/useAuth";
import { changeFormat } from "@/utils/changeFormat";

export default function OrderList() {
  const { getCookie } = useAuth();

  const { data: myOrder } = useQuery({
    queryKey: ["orderList"],
    queryFn: () => getMyOrderList(getCookie()),
  });

  if (myOrder === undefined) return <p className="text-center my-5">주문 내역이 없습니다.</p>;

  return (
    <>
      {myOrder.map((data) => (
        <li className="bg-white rounded-lg list-none border border-gray my-5 shadow-main" key={data.cartId}>
          <Link className="w-full flex items-start gap-5 px-5 py-6 drag-none" href={`receipt/${data.cartId}`}>
            <div className="w-full">
              <p className="text-base font-bold leading-[150%]">{data.storeName}</p>
              <div className="flex justify-around w-full gap-[6px] mt-2 text-[#787878] text-sm font-normal leading-[150%]">
                <div className="flexcol">
                  <div className="flex gap-3 w-60">
                    <span className="font-semibold">주문 번호</span>
                    <p>{data.cartId}</p>
                  </div>
                  <div className="flex gap-3 w-60">
                    <span className="font-semibold">주문 일자</span>
                    <p>{changeFormat.time(data.modifiedDate)}</p>
                  </div>
                  <div className="flex gap-3 w-60 text-[#787878] text-sm font-normal leading-[150%]">
                    <span className="font-semibold">주문 상품</span>
                    {data.products.length === 1 ? (
                      <p>{data.products[0].name}</p>
                    ) : (
                      <p>{changeFormat.outer(data.products)}</p>
                    )}
                  </div>
                </div>
                <div className="flexcol">
                  <div className="flex gap-3 w-60">
                    <span className="font-semibold">주문 상태</span>
                    <p>{changeFormat.orderStatus(data.storeStatus)}</p>
                  </div>
                  <div className="flex gap-3 w-60">
                    <span className="font-semibold">주문 가격</span>
                    <p>{changeFormat.price(data.totalPrice)}원</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
}
