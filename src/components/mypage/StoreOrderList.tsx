"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { onChangeOrderStatus } from "@/app/api/carts";
import { getAllOrder } from "@/app/api/store";
import useAuth from "@/hooks/useAuth";
import { changeFormat } from "@/utils/changeFormat";

interface Props {
  type: "new" | "read" | "done";
}

function StoreOrderList({ type }: Props) {
  const { getCookie } = useAuth();
  const token = getCookie();

  const { data: orderData } = useQuery({
    queryKey: ["orderList"],
    queryFn: () => getAllOrder(token),
  });
  const queryClient = useQueryClient();

  const onChangeOrderStatusMutate = useMutation({
    mutationFn: onChangeOrderStatus,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["orderList"] }),
  });

  const acceptOrder = (orderId: number) => {
    onChangeOrderStatusMutate.mutate({ orderId, type: "READ", token: getCookie() });
  };

  const rejectOrder = (orderId: number) => {
    onChangeOrderStatusMutate.mutate({ orderId, type: "CANCELED", token: getCookie() });
  };

  const completeOrder = (orderId: number) => {
    onChangeOrderStatusMutate.mutate({ orderId, type: "SOLD", token: getCookie() });
  };

  if (orderData === undefined) return <p>주문내역이 없습니다.</p>;

  const filterData = () => {
    if (type === "new") return orderData?.filter((data) => data.storeStatus === "NEWORDER");
    if (type === "read") return orderData?.filter((data) => data.storeStatus === "READ");
    else return orderData?.filter((data) => data.storeStatus === "SOLD" || data.storeStatus === "CANCELED");
  };

  if (filterData().length === 0) return <p>주문내역이 없습니다.</p>;

  return (
    <>
      {filterData().map((data) => (
        <li
          className="bg-white rounded-lg list-none border border-gray my-5 shadow-main cursor-default select-none"
          key={data.orderId}
        >
          <div className="w-full flex items-start gap-5 px-5 py-6 drag-none">
            <div className="w-full flexcol gap-5">
              <p className="text-base font-bold leading-[150%]">{data.storeName}</p>
              <div className="flex justify-around w-full gap-[6px] mt-2 text-[#787878] text-sm font-normal leading-[150%]">
                <div className="flexcol">
                  <div className="flex gap-3 w-60">
                    <span className="font-semibold">주문 번호</span>
                    <p>{data.orderId}</p>
                  </div>
                  <div className="flex gap-3 w-60">
                    <span className="font-semibold">주문 일자</span>
                    <p>{data.modifiedDate.replace("T", " ").slice(0, 16)}</p>
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
              <div className="flex justify-around text-white">
                {type !== "done" && (
                  <input
                    className="auth-button"
                    type="button"
                    value="주문 취소"
                    onClick={() => rejectOrder(data.orderId)}
                  />
                )}{" "}
                {type === "new" && (
                  <input
                    className="auth-button bg-sky-500"
                    type="button"
                    value="주문 확인"
                    onClick={() => acceptOrder(data.orderId)}
                  />
                )}{" "}
                {type === "read" && (
                  <input
                    className="auth-button bg-lime-500 text-black"
                    type="button"
                    value="판매 완료"
                    onClick={() => completeOrder(data.orderId)}
                  />
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

export default StoreOrderList;
