import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import { signinApi, signupApi } from "@/app/api/auth";

import type { SessionUser, SigninFormProps, SignupAPI } from "@/types/auth.type";

export default function useAuth() {
  const cookies = useCookies();
  const router = useRouter();
  const signin = async (request: SigninFormProps) => {
    const token = await signinApi(request);

    cookies.set("token", token);

    if (isStore()) router.push("/mystore");
    else router.push("/");
  };

  const signout = () => {
    sessionStorage.removeItem("user");
    cookies.remove("token");
    router.push("/");
  };

  const signup = async (request: SignupAPI) => {
    await signupApi(request);
    await signin({ email: request.email, password: request.password });
  };

  const isLogin = () => {
    return cookies.get("token") !== undefined;
  };

  const getUserInfo = () => {
    if (!isLogin()) return null;

    const sessionData = typeof window !== undefined ? sessionStorage.getItem("user") : null;
    if (sessionData === null) return null;

    const userInfo: SessionUser = JSON.parse(sessionData);
    return userInfo;
  };

  const isStore = () => {
    const userData = getUserInfo();
    if (userData === null) return false;

    return userData.isStore;
  };

  const getCookie = () => {
    const cookie = cookies.get("token");
    return cookie;
  };

  return { signin, signout, signup, isLogin, isStore, getUserInfo };
}
