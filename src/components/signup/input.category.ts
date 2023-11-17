import type { InputProps, SignupUserProps } from "@/types/auth.type";

export const userInputProps: InputProps<SignupUserProps>[] = [
  { id: "email", label: "아이디", placeholder: "아이디를 입력해주세요", type: "email" },
  { id: "password", label: "비밀번호", placeholder: "비밀번호를 입력해주세요", type: "password" },
  { id: "passwordConfirm", label: "비밀번호 확인", placeholder: "비밀번호를 한번 더 입력해주세요", type: "password" },
  { id: "name", label: "성함", placeholder: "성함을 입력해주세요", type: "text" },
  { id: "phone", label: "휴대전화", placeholder: "휴대전화를 입력해주세요", type: "tel" },
];
