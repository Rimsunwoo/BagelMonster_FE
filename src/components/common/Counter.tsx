import type { counterFuncType } from "./counter.hook";

interface CounterProps {
  counterFunc: counterFuncType;
  count: number;
}

export default function Counter({ counterFunc, count }: CounterProps) {
  return (
    <>
      <div className="flex">
        <button onClick={() => counterFunc("minus")} className="count-box flex-box">
          <span className="inline-block">-</span>
        </button>
        <div className="count-box flex-box text-xs text-black">
          <span className="inline-block">{count}</span>
        </div>
        <button onClick={() => counterFunc("plus")} className="count-box flex-box">
          <span className="inline-block">+</span>
        </button>
      </div>
    </>
  );
}
