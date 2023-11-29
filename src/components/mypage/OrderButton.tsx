import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeOrderStatus } from "@/app/api/order";

import type { Token } from "@/types/auth.type";

interface Props {
  token: Token;
  orderId: number;
  type: "new" | "read" | "done";
}

export default function OrderButton({ token, orderId, type }: Props) {
  const queryClient = useQueryClient();

  const changeOrderStatusMutate = useMutation({
    mutationFn: changeOrderStatus,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["orderList"] }),
  });

  const changeOrderHandler = (orderId: number, type: "read" | "canceled" | "sold") => {
    changeOrderStatusMutate.mutate({ orderId, type, token });
  };

  return (
    <div className="flex justify-around text-white">
      {type !== "done" && (
        <input
          className="auth-button"
          type="button"
          value="주문 취소"
          onClick={() => changeOrderHandler(orderId, "canceled")}
        />
      )}
      {type === "new" && (
        <input
          className="auth-button bg-sky-500"
          type="button"
          value="주문 확인"
          onClick={() => changeOrderHandler(orderId, "read")}
        />
      )}
      {type === "read" && (
        <input
          className="auth-button bg-lime-500 text-black"
          type="button"
          value="판매 완료"
          onClick={() => changeOrderHandler(orderId, "sold")}
        />
      )}
    </div>
  );
}
