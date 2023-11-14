import StoreCard from "@/components/main/StoreCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flexcol gap-10">
      <div className="px-5 flexcol justify-center gap-7 h-[50vh] relative">
        <Image src="/main.jpg" fill sizes="100% 50vh" alt="Bagel Monster" className="-z-10" />
        <pre className="text-white text-2xl font-bold leading-[125%]">{`베이글 몬스터와
어쩌구 저쩌구 하세요!`}</pre>
        <pre className="text-white text-[11px] font-normal leading-[150%] opacity-80">
          {`베이글 몬스터는 어쩌구 저쩌구 기획하고,
이러헤 저러케 해서 개발하고있는 프로젝트입니다
베이글 몬스터와 함꼐 뭐시기뭐시기 하세요!`}
        </pre>
      </div>

      <div>
        <p className="text-black text-base font-semibold leading-[150%] px-5">요즘 인기있는 베이글 (피그마 픽셀)</p>
        <div className="relative overflow-x-scroll z-10 scroll-none">
          <ul className={`flex gap-5 w-[1000px] select-none py-4 px-5`}>
            <StoreCard width={174} height={136} />
          </ul>
        </div>
      </div>

      <div>
        <p className="text-black text-base font-semibold leading-[150%] px-5">요즘 인기있는 베이글 (피그마 비율)</p>
        <div className="relative overflow-x-scroll z-10 scroll-none">
          <div className={`flex gap-5 w-[1000px] select-none py-4 px-5`}>
            <StoreCard width={224} height={180} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-black text-base font-semibold leading-[150%] px-5">
          가까운 베이글가게 (이미지 16:9 비율 가로 200px)
        </p>
        <div className="relative overflow-x-scroll z-10 scroll-none">
          <div className={`flex gap-5 w-[1000px] select-none py-4 px-5`}>
            <StoreCard width={200} height={112.5} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-black text-base font-semibold leading-[150%] px-5">
          가까운 베이글가게 (이미지 정방형 비율 가로 200px)
        </p>
        <div className="relative overflow-x-scroll z-10 scroll-none">
          <div className={`flex gap-5 w-[1000px] select-none py-4 px-5`}>
            <StoreCard width={200} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
