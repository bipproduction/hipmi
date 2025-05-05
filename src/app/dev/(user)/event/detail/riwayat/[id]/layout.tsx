import { LayoutEvent_DetailRiwayat } from "@/app_modules/event";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutEvent_DetailRiwayat>{children}</LayoutEvent_DetailRiwayat>
    </>
  );
}
