import { useCookies } from "react-cookie";

import { signinApi, signupApi } from "@/app/api/auth";

import type { SigninFormProps, SignupAPI } from "@/types/auth.type";

export default function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const signin = async (request: SigninFormProps) => {
    const token = await signinApi(request);
    const option = { path: "/", maxAge: 3600, httpOnly: true };

    setCookie("token", token, option);
  };

  const signout = () => {
    sessionStorage.removeItem("user");
    removeCookie("token");
  };

  const signup = async (request: SignupAPI) => {
    await signupApi(request);
    signin({ email: request.email, password: request.password });
  };

  const isLogin = () => {
    return cookies.token !== undefined;
  };

  return { signin, signout, signup, isLogin };
}
