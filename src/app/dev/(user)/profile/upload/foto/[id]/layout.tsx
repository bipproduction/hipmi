import { UploadFotoProfileLayout } from "@/app_modules/katalog/profile";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UploadFotoProfileLayout>{children}</UploadFotoProfileLayout>
    </>
  );
}
