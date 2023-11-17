"use client";

import { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "next-client-cookies";

import store from "@/redux/config/configStore";

export default function Provider({ children, cookieValue }: { children: React.ReactNode; cookieValue: any }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
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
