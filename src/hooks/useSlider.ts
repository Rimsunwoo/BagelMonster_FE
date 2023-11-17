import { useState } from "react";

import { throttle } from "@/utils/throttle";

interface UseSliderProps {
  scrollRef: React.RefObject<HTMLElement>;
  throttleDelay: number;
}

function useSlider({ scrollRef, throttleDelay }: UseSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number>(0);

  const onDragStart = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX + scrollRef.current.scrollLeft);
    }
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isDragging && scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const onThrottleDragMove = throttle(onDragMove, throttleDelay);
  return { isDragging, onDragStart, onDragEnd, onThrottleDragMove };
}

export default useSlider;
