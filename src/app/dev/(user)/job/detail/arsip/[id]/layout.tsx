import { LayoutJob_DetailArsip } from "@/app_modules/job";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutJob_DetailArsip>{children}</LayoutJob_DetailArsip>
    </>
  );
}
