import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { LayoutForum_Main } from "@/app_modules/forum";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLoginId = await funGetUserIdByToken();

  return (
    <>
      <LayoutForum_Main userLoginId={userLoginId}>{children}</LayoutForum_Main>
    </>
  );
}
