"use client";

import { Provider } from "react-redux";

import store from "./config/configStore";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
