"use client";

import { useState } from "react";
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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  );
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider value={cookieValue}>{children}</CookiesProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
