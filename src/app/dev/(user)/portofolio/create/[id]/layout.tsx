import { CreatePortofolioLayout } from "@/app_modules/katalog/portofolio";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreatePortofolioLayout>{children}</CreatePortofolioLayout>
    </>
  );
}
