import { LayoutJob_DetailPublish } from "@/app_modules/job";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutJob_DetailPublish>{children}</LayoutJob_DetailPublish>
    </>
  );
}
