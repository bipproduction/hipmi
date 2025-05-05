import LayoutProfile_UpdateFotoBackground from "@/app_modules/katalog/profile/upload/foto_background/layout";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LayoutProfile_UpdateFotoBackground>
        {children}
      </LayoutProfile_UpdateFotoBackground>
    </>
  );
}
