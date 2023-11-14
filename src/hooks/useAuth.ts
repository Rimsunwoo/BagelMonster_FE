import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

import { signinApi, signupApi } from "@/app/api/auth";

import type { SigninFormProps, SignupAPI } from "@/types/auth.type";

export default function useAuth() {
  const cookies = useCookies();
  const router = useRouter();

  const signin = async (request: SigninFormProps) => {
    const token = await signinApi(request);

    cookies.set("token", token);
    router.push("/");
  };

  const signout = () => {
    sessionStorage.removeItem("user");
    cookies.remove("token");
    router.push("/");
  };

  const signup = async (request: SignupAPI) => {
    await signupApi(request);
    signin({ email: request.email, password: request.password });
  };

  const isLogin = () => {
    return cookies.get("token") !== undefined;
  };

  const isStore = () => {
    const userData = JSON.parse(sessionStorage.getItem("user") as string);
    if (userData === null) return false;

    return userData.isStore as boolean;
  };

  return { signin, signout, signup, isLogin, isStore };
}
