import { LayoutJob_Main } from "@/app_modules/job";
import NewLayoutJob_Main from "@/app_modules/job/main/new_layout";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <LayoutJob_Main>{children}</LayoutJob_Main> */}
      <NewLayoutJob_Main>{children}</NewLayoutJob_Main>
    </>
  );
}
