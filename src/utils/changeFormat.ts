import type { ProductGetResponse, StoreStatus } from "@/types/cart.type";

export const changeFormat = {
  outer: (content: ProductGetResponse[]) => {
    if (content.length === 0) return "없음";
    const contentLength = content.length;
    if (contentLength === 1) return content[0].name;
    else return `${content[0].name} 외 ${contentLength - 1}개`;
  },
  orderStatus: (status: StoreStatus) => {
    if (status === "READ") return "상품준비 중";
    if (status === "SOLD") return "판매 완료";
    if (status === "CANCELED") return "주문 취소";
    return "주문접수 중";
  },
  time: (DataTime: string) => {
    return DataTime.replace("T", " ").slice(0, 16);
  },
  DuringTime: (DataOpenedTime: string, DataClosedTime: string) => {
    return `${DataOpenedTime.substring(0, 5)}~${DataClosedTime.substring(0, 5)}`;
  },
  price: (price: number) => {
    return price.toLocaleString();
  },
  totalPrice: ({ price, quantity }: { price: number; quantity: number }) => {
    return (price * quantity).toLocaleString();
  },
};
