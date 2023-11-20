import { useDispatch, useSelector } from "react-redux";

import useAuth from "@/hooks/useAuth";
import { isModify } from "@/redux/modules/editStoreSlice";
import { changeFormat } from "@/utils/changeFormat";

import type { RootState } from "@/redux/config/configStore";

export default function StoreInfo() {
  const { isStore } = useAuth();
  const { modifyState, storeInfo } = useSelector((state: RootState) => state.ModifyStore);
  const { openedTime, closedTime, closedDays, name, phone, address } = storeInfo;

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(isModify());
  };

  return (
    <section className="mb-9">
      {!modifyState && isStore() && (
        <input
          type="button"
          className="auth-button flex items-center justify-center w-full text-white my-2"
          value="수정하기"
          onClick={handleEdit}
        />
      )}
      <div className="pb-8 space-y-2">
        <p className="text-[13px]">
          <span className="info-box">영업시간</span>
          <span>{`${changeFormat.DuringTime(openedTime, closedTime)}`}</span>
        </p>
        <p className="text-[13px]">
          <span className="info-box">휴무일</span>
          <span>
            {closedDays === "연중무휴" || closedDays.includes("공휴일") ? `${closedDays}` : `${closedDays}요일`}
          </span>
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
