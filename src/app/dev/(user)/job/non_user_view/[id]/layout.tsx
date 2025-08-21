import { LayoutJob_NonUserView } from "@/app_modules/job";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutJob_NonUserView>{children}</LayoutJob_NonUserView>
    </>
  );
}
