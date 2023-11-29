import Image from "next/image";

import useCart from "@/hooks/useCart";
import { changeFormat } from "@/utils/changeFormat";

import Counter from "../common/Counter";

import type { ProductGetResponse } from "@/types/product.type";

interface ProductItemProps {
  product: ProductGetResponse;
  selectedItems: number[];
  toggleProductSelection: (productId: number) => void;
}

export default function ProductItem({ product, selectedItems, toggleProductSelection }: ProductItemProps) {
  const { name, productId, productPictureUrl, quantity, price } = product;
  const { deleteProduct } = useCart();
  return (
    <div className="w-full px-3 bg-white flex gap-3">
      <input
        className="checkbox"
        type="checkbox"
        id={name}
        checked={selectedItems.includes(productId)}
        onChange={() => toggleProductSelection(productId)}
      />
      <label htmlFor={name} className="gap-5 inline-flex items-center">
        <div className="w-24 h-24px relative">
          <Image src={productPictureUrl} alt={name} width={96} height={96} className="rounded" />
        </div>
        <div className="flex-col gap-3 inline-flex">
          <div className="flex-col gap-2 flex">
            <p className=" text-zinc-800 text-base font-bold leading-snug">{name}</p>
            <div className="justify-start items-center gap-1 inline-flex">
              <p className="text-[#f15a23] text-sm font-bold leading-tight">{changeFormat.price(price)}원</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Counter defaultValue={quantity} productId={productId} />
            <button
              className="border border-[#ddd] rounded-sm px-2 py-1 h-6 text-black text-[13px] font-medium leading-[125%]"
              onClick={() => deleteProduct(productId)}
            >
              선택 삭제
            </button>
          </div>
        </div>
      </label>
    </div>
  );
}
