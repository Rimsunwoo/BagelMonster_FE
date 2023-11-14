"use client";

import { Provider as ReduxProvider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "next-client-cookies";

import store from "@/redux/config/configStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Provider({ children, cookieValue }: { children: React.ReactNode; cookieValue: any }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider value={cookieValue}>{children}</CookiesProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
