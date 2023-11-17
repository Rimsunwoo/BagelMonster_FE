import type { ProductGetResponse, StoreStatus } from "@/types/cart.type";

export const changeFormat = {
  outer: (content: ProductGetResponse[]) => {
    const contentLength = content.length;
    if (contentLength === 1) return content[0].name;
    else return `${content[0].name} 외 ${contentLength - 1}개`;
  },
  orderStatus: (status: StoreStatus) => {
    console.log("status :", status);
    if (status === "READ") return "상품준비 중";
    if (status === "SOLD") return "판매 완료";
    if (status === "CANCELED") return "주문 취소";
    return "주문접수 중";
  },
};
