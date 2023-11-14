import type { StoreInfo } from "@/types/store.type";
interface StoreInfoProps {
  infoData: StoreInfo;
}

export default function StoreInfo({ infoData }: StoreInfoProps) {
  const { openedTime, closedTime, closedDays, name, phone, address } = infoData;

  return (
    <section>
      <div className="py-8 space-y-2">
        <p className="text-[13px]">
          <span className="info-box">영업시간</span>
          <span>{`${openedTime}~${closedTime}`}</span>
        </p>
        <p className="text-[13px]">
          <span className="info-box">휴무일</span>
          <span>{`매주 ${closedDays}요일`}</span>
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-[13px]">
          <span className="info-box">상호명</span>
          <span>{name}</span>
        </p>
        <p className="text-[13px]">
          <span className="info-box">전화번호</span>
          <span>{phone}</span>
        </p>
        <p className="text-[13px]">
          <span className="info-box">주소</span>
          <span>{address}</span>
        </p>
      </div>
    </section>
  );
}
