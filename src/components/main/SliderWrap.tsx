"use client";

import { useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getStore } from "@/app/api/store";
import useSlider from "@/hooks/useSlider";

import StoreCard from "./StoreCard";

export default function SliderWrap() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isDragging, onDragStart, onDragEnd, onThrottleDragMove } = useSlider({ scrollRef, throttleDelay: 50 });

  const { data: storeData } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: [],
  });

  const newFiveStore = storeData.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1)).slice(0, 5);

  return (
    <div>
      <p className="text-black text-base font-semibold leading-[150%] px-5">새로 생긴 베이글</p>
      <div
        className="relative overflow-x-scroll z-10 scroll-none"
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={isDragging ? onThrottleDragMove : undefined}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        <ul className={`flex gap-5  w-[1000px] select-none py-4 px-5`}>
          {newFiveStore.map((data) => (
            <StoreCard key={data.storeId} store={data} />
          ))}
          <li className="shadow-main rounded flex h-[234px]">
            <Link href="/stores" className="flexcol bg-neutral-200 w-20 drag-none items-center justify-center h-full">
              <span className="flex items-center justify-center bg-white w-10 h-10 rounded-full text-xs font-bold leading-[150%]">
                더보기
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
