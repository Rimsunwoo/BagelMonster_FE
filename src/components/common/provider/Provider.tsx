"use client";

import { Provider as ReduxProvider } from "react-redux";

import { CookiesProvider } from "next-client-cookies";

import store from "@/redux/config/configStore";

export default function Provider({ children, cookieValue }: { children: React.ReactNode; cookieValue: any }) {
  return (
    <ReduxProvider store={store}>
      <CookiesProvider value={cookieValue}>{children}</CookiesProvider>
    </ReduxProvider>
  );
}
