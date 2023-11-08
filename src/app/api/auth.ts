import type { signinFormProps, SignupFormProps } from "@/types/auth.type";

import { API_URL } from "./index";

export async function signin(request: signinFormProps) {
  const response = await fetch(`${API_URL}/api/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("로그인 실패");
  }

  alert("로그인 성공");
}

export async function signup(request: SignupFormProps) {
  const response = await fetch(`${API_URL}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }

  alert("회원가입에 성공했습니다.");
}
