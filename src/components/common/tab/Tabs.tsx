import React from "react";

export default function Tabs({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-4 w-full">{children}</div>;
}
