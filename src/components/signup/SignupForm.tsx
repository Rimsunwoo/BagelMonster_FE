"use client";

import { useState } from "react";

import UserForm from "./UserForm";
import Tab from "../common/tab/Tab";
import TabPanel from "../common/tab/TabPanel";
import Tabs from "../common/tab/Tabs";

export default function SignupForm() {
  const [currentTab, setCurrentTab] = useState("일반회원");

  const onChangeTabHandler = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="flexcol gap-4 self-stretch my-8">
      <Tabs>
        <Tab currentTab={currentTab} label="일반회원" onChangeTabHandler={onChangeTabHandler} />
        <Tab currentTab={currentTab} label="사업자회원" onChangeTabHandler={onChangeTabHandler} />
      </Tabs>
      <TabPanel label={"일반회원"} currentTab={currentTab} component={<UserForm isStore={false} />} />
      <TabPanel label={"사업자회원"} currentTab={currentTab} component={<UserForm isStore={true} />} />
    </div>
  );
}
