"use client";

import { useState } from "react";

import StoreForm from "./StoreForm";
import UserForm from "./UserForm";

export default function SignupForm() {
  const [currentTab, setCurrentTab] = useState<"user" | "store">("user");

  const onChangeTabHandler = (tab: "user" | "store") => {
    setCurrentTab(tab);
  };

  return (
    <div className="flex flex-col gap-4 self-stretch my-9">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onChangeTabHandler("user")}
          className={`
          flex flex-1 items-center justify-center h-10 bg-slate-100 cursor-pointer px-4 border-b-2
          ${currentTab === "user" ? "border-black" : "border-slate-100"}
          `}
        >
          소비자
        </button>
        <button
          type="button"
          onClick={() => onChangeTabHandler("store")}
          className={`
          flex flex-1 items-center justify-center h-10 bg-slate-100 cursor-pointer px-4 border-b-2
          ${currentTab === "store" ? "border-black" : "border-slate-100"}
          `}
        >
          사업자
        </button>
      </div>
      {currentTab === "user" ? <UserForm /> : <StoreForm />}
    </div>
  );
}
