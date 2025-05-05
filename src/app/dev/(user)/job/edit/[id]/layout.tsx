import { LayoutJob_Edit } from "@/app_modules/job";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutJob_Edit>{children}</LayoutJob_Edit>
    </>
  );
}
