import { useCookies } from "next-client-cookies";

import { signinApi, signupApi } from "@/app/api/auth";

import type { SigninFormProps, SignupAPI } from "@/types/auth.type";

export default function useAuth() {
  const cookies = useCookies();

  const signin = async (request: SigninFormProps) => {
    const token = await signinApi(request);

    cookies.set("token", token);
  };

  const signout = () => {
    sessionStorage.removeItem("user");
    cookies.remove("token");
  };

  const signup = async (request: SignupAPI) => {
    await signupApi(request);
    signin({ email: request.email, password: request.password });
  };

  const isLogin = () => {
    return cookies.get("token") !== undefined;
  };

  return { signin, signout, signup, isLogin };
}
