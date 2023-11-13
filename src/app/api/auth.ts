import type { SigninFormProps, SignupAPI } from "@/types/auth.type";

import { API_URL } from ".";

export async function signinApi(request: SigninFormProps) {
  const response = await fetch(`${API_URL}/api/users/signin`, {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("로그인 실패");
  }

  const data = await response.json();
  sessionStorage.setItem("user", JSON.stringify(data));

  return response.headers.get("Authorization") as string;
}

export async function signupApi(request: SignupAPI) {
  const response = await fetch(`${API_URL}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }
}
