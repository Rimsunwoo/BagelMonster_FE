import Image from "next/image";
import Link from "next/link";
import TEST_IMG from "public/vercel.svg";

export const mockData = [
  {
    storeId: 1,
    name: "코끼리 베이글 서초점",
    address: "서울시 강남구",
    storePictureUrl: TEST_IMG,
    phone: "010-1234-5678",
    content: "1번가게 설명",
    productCreatedTime: "T11:00",
    openedTime: "T10:00",
    closedTime: "T13:00",
    closedDays: "월요일 휴무",
  },
  {
    storeId: 2,
    name: "베이글 천국 천호점",
    address: "서울시 강동구",
    storePictureUrl: TEST_IMG,
    phone: "010-1234-5678",
    content: "2번가게 설명",
    productCreatedTime: "T11:00",
    openedTime: "T09:00",
    closedTime: "T21:00",
    closedDays: "일요일 휴무",
  },
  {
    storeId: 3,
    name: "베이글 나라 마곡점",
    address: "서울시 강서구",
    storePictureUrl: TEST_IMG,
    phone: "010-1234-5678",
    content: "3번가게 설명",
    productCreatedTime: "T11:00",
    openedTime: "T10:00",
    closedTime: "T21:00",
    closedDays: "월요일 휴무",
  },
  {
    storeId: 4,
    name: "4번가게",
    address: "서울시 강북구",
    storePictureUrl: TEST_IMG,
    phone: "010-1234-5678",
    content: "4번가게 설명",
    productCreatedTime: "T11:00",
    openedTime: "T10:00",
    closedTime: "T21:00",
    closedDays: "월요일 휴무",
  },
  {
    storeId: 5,
    name: "5번가게",
    address: "서울시 강남구",
    storePictureUrl: TEST_IMG,
    phone: "010-1234-5678",
    content: "5번가게 설명",
    productCreatedTime: "T11:00",
    openedTime: "T10:00",
    closedTime: "T20:00",
    closedDays: "월요일 휴무",
  },
  {
    storeId: 6,
    name: "6번가게",
    address: "서울시 강동구",
    storePictureUrl: TEST_IMG,
    phone: "010-1234-5678",
    content: "6번가게 설명",
    productCreatedTime: "T11:00",
    openedTime: "T09:00",
    closedTime: "T21:00",
    closedDays: "일요일 휴무",
  },
];

export default function Home() {
  return (
    <div className="flexcol gap-10">
      <div className="bg-orange px-5 flexcol justify-center gap-7 h-[50vh]">
        <pre className="text-white text-2xl font-bold leading-[125%]">{`베이글 몬스터와
어쩌구 저쩌구 하세요!`}</pre>
        <pre className="text-white text-[11px] font-normal leading-[150%] opacity-80">
          {`베이글 몬스터는 어쩌구 저쩌구 기획하고,
이러헤 저러케 해서 개발하고있는 프로젝트입니다
베이글 몬스터와 함꼐 뭐시기뭐시기 하세요!`}
        </pre>
      </div>
      <div>
        <p className="text-black text-base font-semibold leading-[150%] px-5">요즘 인기있는 베이글 (픽셀 고정)</p>
        <div className="relative overflow-x-scroll z-10 scroll-none">
          <div className={`flex gap-5 w-[1000px] select-none py-4 px-5`}>
            {mockData.map((data) => (
              <div key={data.storeId} className="shadow-main rounded">
                <Link href={`stores/${data.storeId}`} className="drag-none">
                  <Image src={TEST_IMG} alt="" className="w-[174px] h-[136px] drag-none" />
                  <div className="w-[174px] px-6 py-5">
                    <p className="text-black text-sm font-bold leading-[150%]">{data.name}</p>
                    <p className="text-[#787878] text-[11px] font-normal leading-[150%]">{data.address}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-black text-base font-semibold leading-[150%] px-5">요즘 인기있는 베이글 (비율 고정)</p>
        <div className="relative overflow-x-scroll z-10 scroll-none">
          <div className={`flex gap-5 w-[1000px] select-none py-4 px-5`}>
            {mockData.map((data) => (
              <div key={data.storeId} className="shadow-main rounded">
                <Link href={`stores/${data.storeId}`} className="drag-none">
                  <Image src={TEST_IMG} alt="" className="w-[224px] h-[180px] drag-none" />
                  <div className="w-[224px] px-6 py-5">
                    <p className="text-black text-sm font-bold leading-[150%]">{data.name}</p>
                    <p className="text-[#787878] text-[11px] font-normal leading-[150%]">{data.address}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-black text-base font-semibold leading-[150%] px-5">
          가까운 베이글가게 (이미지 16:9 비율 가로 200px)
        </p>
        <div className="relative overflow-x-scroll z-10 scroll-none">
          <div className={`flex gap-5 w-[1000px] select-none py-4 px-5`}>
            {mockData.map((data) => (
              <div key={data.storeId} className="shadow-main rounded">
                <Link href={`stores/${data.storeId}`} className="drag-none">
                  <Image src={TEST_IMG} alt="" className="w-[200px] h-[112.5px] drag-none" />
                  <div className="w-[200px] px-6 py-5">
                    <p className="text-black text-sm font-bold leading-[150%]">{data.name}</p>
                    <p className="text-[#787878] text-[11px] font-normal leading-[150%]">{data.address}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-black text-base font-semibold leading-[150%] px-5">
          가까운 베이글가게 (이미지 정방형 비율 가로 200px)
        </p>
        <div className="relative overflow-x-scroll z-10 scroll-none">
          <div className={`flex gap-5 w-[1000px] select-none py-4 px-5`}>
            {mockData.map((data) => (
              <div key={data.storeId} className="shadow-main rounded">
                <Link href={`stores/${data.storeId}`} className="drag-none">
                  <Image src={TEST_IMG} alt="" className="w-[200px] h-[200px] drag-none" />
                  <div className="w-[200px] px-6 py-5">
                    <p className="text-black text-sm font-bold leading-[150%]">{data.name}</p>
                    <p className="text-[#787878] text-[11px] font-normal leading-[150%]">{data.address}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
