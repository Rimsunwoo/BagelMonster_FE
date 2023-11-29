import React from "react";

import useCart from "@/hooks/useCart";

import type { ProductGetResponse } from "@/types/product.type";

interface Props {
  selectedItems: number[];
  products: ProductGetResponse[] | undefined;
  toggleAllProductsSelection: () => void;
}

export default function CartHeader({ selectedItems, products = [], toggleAllProductsSelection }: Props) {
  const { deleteSelectedProducts, deleteAllProducts } = useCart();

  return (
    <div className="w-full flex justify-between items-center px-[5%]">
      <div className="flex gap-2 items-center">
        <input
          className="checkbox"
          type="checkbox"
          id="selectAll"
          checked={selectedItems.length === products.length}
          onChange={toggleAllProductsSelection}
        />
        <label className="text-black text-[13px] font-medium leading-[125%] select-none" htmlFor="selectAll">
          전체선택
        </label>
      </div>
      <div className="flex gap-2 items-center text-[#888] text-[13px] font-normal leading-[125%]">
        <input
          className="cursor-pointer"
          type="button"
          value={"선택삭제"}
          onClick={() => deleteSelectedProducts(selectedItems)}
        />
        <span className="w-px h-2.5 bg-[#c5c5c5]" />
        <input className="cursor-pointer" type="button" value={"전체삭제"} onClick={deleteAllProducts} />
      </div>
    </div>
  );
}
