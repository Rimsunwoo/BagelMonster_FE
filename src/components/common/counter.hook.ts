"use client";

import { useState } from "react";
export type countType = "minus" | "plus";
export type counterFuncType = (type: countType) => void;

export default function useCounter(): [number, counterFuncType] {
  let [count, setCount] = useState(1);

  const counterFunc: counterFuncType = (type) => {
    if (type === "minus" && count !== 1) {
      setCount(count - 1);
    } else if (type === "plus" && count !== 99) {
      setCount(count + 1);
    }
  };
  return [count, counterFunc];
}
