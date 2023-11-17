import type { InputProps, StoreFormProps } from "@/types/store.type";

export const storeInputProps: InputProps<StoreFormProps>[] = [
  { id: "name", label: "상호명", placeholder: "상호명을 입력해주세요", type: "text" },
  { id: "address", label: "가게 주소", placeholder: "가게 주소를 입력해주세요", type: "address" },
  { id: "phone", label: "가게 전화번호", placeholder: "가게 전화번호를 입력해주세요", type: "tel" },
  { id: "content", label: "가게 소개글", placeholder: "가게 소개글을 입력해주세요", type: "text" },
  { id: "productCreatedTime", label: "빵 나오는 시간", placeholder: "상품 제조 시간을 입력해주세요", type: "time" },
  { id: "openedTime", label: "오픈 시간", placeholder: "오픈 시간을 입력해주세요", type: "time" },
  { id: "closedTime", label: "마감 시간", placeholder: "마감 시간을 입력해주세요", type: "time" },
];

export const days = [
  { id: "mon", value: "월" },
  { id: "tue", value: "화" },
  { id: "wed", value: "수" },
  { id: "thu", value: "목" },
  { id: "fri", value: "금" },
  { id: "sat", value: "토" },
  { id: "sun", value: "일" },
  { id: "holiday", value: "공휴일" },
];
