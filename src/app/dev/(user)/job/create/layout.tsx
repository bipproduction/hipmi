import { LayoutJob_Create } from "@/app_modules/job";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutJob_Create>{children}</LayoutJob_Create>
    </>
  );
}
