import ImageBox from "./ImageBox";

export default function Banner() {
  return (
    <div className="px-5 flexcol justify-center gap-7 h-[520px] relative">
      <ImageBox />
      <div className="flexcol gap-1 translate-y-[200%]">
        <p className="w-[130px] flex items-center justify-center px-1 py-2 bg-[#000] text-lg leading-[125%] select-none">
          <span className="text-[#f9b233] font-bold">베이글 몬스터</span>
          <span className="text-white font-normal">와</span>
        </p>
        <p className="w-[230px] flex items-center justify-center gap-2 px-1 py-2 bg-[#000] text-xl leading-[125%] select-none">
          <span className="text-white font-normal">오늘도</span>
          <span className="text-[#f9b233] font-bold">맛있는 하루</span>
          <span className="text-white font-normal">되세요</span>
        </p>
      </div>
    </div>
  );
}
