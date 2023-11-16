import type { ProductGetResponse } from "@/types/cart.type";

export const changeFormat = {
  outer: (content: ProductGetResponse[]) => {
    const contentLength = content.length;
    if (contentLength === 1) return content[0].name;
    else return `${content[0].name} 외 ${contentLength - 1}개`;
  },
};
