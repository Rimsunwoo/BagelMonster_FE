"use client";

import { type ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productCountMinus, productCountPlus, setProductCount } from "@/redux/modules/productCountSlice";

import type { RootState } from "@/redux/config/configStore";

interface CounterProps {
  defaultValue?: number;
  productId: string;
}

export default function Counter({ defaultValue, productId }: CounterProps) {
  const counter = useSelector((state: RootState) => state.productCount);
  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultValue === undefined) {
      dispatch(setProductCount({ productId, count: 1 }));
    } else {
      dispatch(setProductCount({ productId, count: defaultValue }));
    }
  }, [defaultValue, dispatch, productId]);

  const counterHandler = (type: "plus" | "minus") => {
    if (productId === undefined) return;

    type === "plus" ? dispatch(productCountPlus(productId)) : dispatch(productCountMinus(productId));
    dispatch({ type, productId });
  };

  const counterDirectInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (productId === undefined) return;
    if (Number(e.target.value) < 1) return;

    dispatch(setProductCount({ productId, count: Number(e.target.value) }));
  };

  return (
    <>
      <div className="flex">
        <input className="count-box cursor-pointer" value="-" type="button" onClick={() => counterHandler("minus")} />
        <input
          className="count-box text-xs text-black text-center "
          value={counter[productId]}
          type="number"
          onChange={(e) => counterDirectInputHandler(e)}
        />
        <input className="count-box " value="+" type="button" onClick={() => counterHandler("plus")} />
      </div>
    </>
  );
}
