"use client";

import { useRef } from "react";
import StoreCard from "./StoreCard";
import useSlider from "@/hooks/useSlider";

export default function SliderWrap() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isDragging, onDragStart, onDragEnd, onThrottleDragMove } = useSlider({ scrollRef, throttleDelay: 50 });

  return (
    <div
      className="relative overflow-x-scroll z-10 scroll-none"
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={isDragging ? onThrottleDragMove : undefined}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      <ul className={`flex gap-5  w-[1000px] select-none py-4 px-5`}>
        <StoreCard width={174} height={136} />
      </ul>
    </div>
  );
}
