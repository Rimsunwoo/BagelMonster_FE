import type { SigninFormProps, SignupAPI } from "@/types/auth.type";

import { API_URL } from ".";

export async function signinApi(request: SigninFormProps) {
  const response = await fetch(`${API_URL}/api/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  const data = await response.json();

  if (!response.ok || data.statusCode === 400) {
    alert(data.statusMessage);
    return;
  }

  sessionStorage.setItem("user", JSON.stringify(data));

  return response.headers.get("Authorization") as string;
}

export async function signupApi(request: SignupAPI) {
  const response = await fetch(`${API_URL}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.statusMessage);
  }
}
