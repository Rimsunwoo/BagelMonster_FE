import ProductList from "@/components/cart/ProductList";

export default function Cart() {
  const testCount = 3;
  const testPrice = 19000;

  return (
    <div className="w-full bg-white flex h-[120vh] flex-col gap-6">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="w-full flex justify-between items-center px-[5%]">
          <div className="flex gap-2 items-center">
            <input className="checkbox" type="checkbox" id="selectAll" />
            <label className="text-zinc-800 text-[13px] font-medium leading-[125%] select-none" htmlFor="selectAll">
              전체선택
            </label>
          </div>
          <div className="flex gap-2 items-center text-[#888] text-[13px] font-normal leading-[125%]">
            <input className="cursor-pointer" type="button" value={"선택삭제"} />
            <span className="w-px h-2.5 bg-[#c5c5c5]" />
            <input className="cursor-pointer" type="button" value={"전체삭제"} />
          </div>
        </div>

        <div className="w-full bg-[#f5f5f5] h-2.5" />

        <div className="w-full flex-col justify-start items-center gap-8 flex">
          <ProductList />
        </div>
        <div className="w-full bg-[#f5f5f5] h-2.5" />

        <div className="w-full flex-col justify-start items-center flex gap-6 px-[5%]">
          <div className="flex flex-col w-full">
            <p className="self-stretch justify-between items-start inline-flex text-sm font-medium leading-[150%]">
              <span className="text-[#aaaaaa]">주문 상품 수</span>
              <span className="text-[#333333]">총 {testCount}개</span>
            </p>
            <p className="self-stretch justify-between items-center inline-flex text-lg leading-[150%]">
              <span className="text-[#333333] font-bold">총 결제금액</span>
              <span className="text-[#f15a23] font-semibold">
                {testPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
              </span>
            </p>
          </div>
          <input
            className="w-full px-4 py-3 rounded bg-[#f15a23] text-[#fff] text-lg font-semibold leading-[125%]"
            value="구매하기"
            type="button"
          />
        </div>
      </div>
    </div>
  );
}
